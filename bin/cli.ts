import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import fsPromise from "fs/promises";
import App from "../src/app";
import { toCamelCase, toHeaderCase, toLowerCase, toPascalCase, toPathCase, toSnakeCase } from "js-convert-case";
import shadowConfig from "../shadow.config.json";
import inquirerAutoCompleteSuggest from "inquirer-autocomplete-prompt";

// Register the autocomplete prompt
inquirer.registerPrompt("autocomplete", inquirerAutoCompleteSuggest);

// ANSI color codes for console logging
const COLOR_RESET = "\x1b[0m";
const COLOR_GREEN = "\x1b[32m";
const COLOR_RED = "\x1b[31m";
const COLOR_YELLOW = "\x1b[33m";

// ─── COLUMN TYPE DEFINITIONS ──────────────────────────────────────────────

const CATEGORY_LIST = {
  "modules": "modules",
  "entity": "entity",
  "route:list": "route:list",
}
type CategoryType = keyof typeof CATEGORY_LIST;

const COLUMN_TYPE_MAP = {
  int: "number",
  integer: "number",
  bigint: "number",
  smallint: "number",
  mediumint: "number",
  tinyint: "number",
  decimal: "number",
  numeric: "number",
  float: "number",
  double: "number",
  real: "number",
  money: "number",
  boolean: "boolean",
  bool: "boolean",
  char: "string",
  varchar: "string",
  text: "string",
  ntext: "string",
  citext: "string",
  json: "object",
  jsonb: "object",
  xml: "string",
  date: "Date",
  datetime: "Date",
  timestamp: "Date",
  timestamptz: "Date",
  time: "Date",
  timetz: "Date",
  interval: "Date",
  uuid: "string",
  bytea: "Buffer",
  blob: "Buffer",
  binary: "Buffer",
  varbinary: "Buffer",
  enum: "string",
  set: "string",
} as const;

type ColumnType = keyof typeof COLUMN_TYPE_MAP;

const COLUMN_LENGTH_MAP: Partial<Record<ColumnType, number>> = {
  char: 1,
  varchar: 255,
  text: 65535,
  ntext: 65535,
  citext: 65535,
  uuid: 36,
  binary: 255,
  varbinary: 255,
};

const getColumnJsType = (type: ColumnType): string =>
  COLUMN_TYPE_MAP[type] || "unknown";

const getColumnLength = (type: ColumnType): number | null =>
  COLUMN_LENGTH_MAP[type] || null;

// ─── INTERFACE DEFINITIONS ─────────────────────────────────────────────────

interface IRecordList {
  name: string;
  type: string;
  columnType?: string;
  length?: number;
}

interface TemplateDir {
  name: string;
  templateDir: string;
  destinationDir: string;
}

// ─── PROMPT FUNCTIONS ──────────────────────────────────────────────────────

async function promptCategory(): Promise<CategoryType> {
  const categoryList = Object.keys(CATEGORY_LIST);
  const { category } = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "category",
      message: "Select a category:",
      source: (_answers: any, input: string = "") =>
        Promise.resolve(categoryList.filter((x) => x.includes(input))),
    },
  ]);
  return category;
}

async function promptModuleName(category: string): Promise<string> {
  const { moduleName } = await inquirer.prompt([
    {
      type: "input",
      name: "moduleName",
      message: `Enter the ${toPathCase(category)} name:`,
      validate: (input: string) =>
        input ? true : `${toPathCase(category)} name is required!`,
    },
  ]);
  return toPascalCase(moduleName);
}

async function promptRecord(): Promise<IRecordList> {
  const columnList = Object.keys(COLUMN_TYPE_MAP);
  const record = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter column name:",
      validate: (input: string) =>
        input ? true : "Column name cannot be empty",
    },
    {
      type: "autocomplete",
      name: "columnType",
      message: "Select column type:",
      source: (_answers: any, input: string = "") =>
        Promise.resolve(columnList.filter((x) => x.includes(input))),
    },
  ]);
  return {
    ...record,
    type: getColumnJsType(record.columnType as ColumnType),
    length: getColumnLength(record.columnType as ColumnType) ?? 0,
  };
}

async function promptRecordList(): Promise<IRecordList[]> {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "Do you want to enter a single or multiple records?",
      choices: ["Single", "Multiple"],
    },
  ]);

  const records: IRecordList[] = [];
  if (mode === "Single") {
    records.push(await promptRecord());
  } else {
    let addMore = true;
    while (addMore) {
      records.push(await promptRecord());
      const { continueAdding } = await inquirer.prompt([
        {
          type: "confirm",
          name: "continueAdding",
          message: "Do you want to add another record?",
          default: true,
        },
      ]);
      addMore = continueAdding;
    }
  }
  return records;
}

// ─── FILE UTILITY FUNCTION ─────────────────────────────────────────────────

async function getFilePaths(
  dir: string,
  extension: string = ".template"
): Promise<string[]> {
  const files: string[] = [];
  async function walk(currentDir: string) {
    const entries = await fsPromise.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) await walk(fullPath);
      else if (entry.name.endsWith(extension)) files.push(fullPath);
    }
  }
  await walk(path.resolve(dir));
  return files;
}

// ─── TEMPLATE GENERATION FUNCTION ──────────────────────────────────────────

async function generateTemplate(
  template: TemplateDir,
  mapper: Record<string, string>
): Promise<void> {
  let { destinationDir, templateDir, name } = template;
  destinationDir = path.resolve(destinationDir);
  templateDir = path.resolve(templateDir);

  const templatePaths = await getFilePaths(templateDir);
  const moduleName = toPascalCase(mapper["module_name"]);
  const outputs: { outPath: string; content: string }[] = [];

  for (const tPath of templatePaths) {
    let content = fs.readFileSync(tPath, "utf-8");

    // Replace placeholders with mapper values
    for (const key in mapper) {
      content = content.replace(new RegExp(`{{${key}}}`, "g"), mapper[key]);
    }

    let outPath: string;
    if (name === "entity") {
      const basename = path
        .basename(tPath)
        .replace("template", "ts")
        .replace("entity", moduleName);
      outPath = path.join(destinationDir, basename);
      if (fs.existsSync(outPath)) {
        console.log(
          `${COLOR_YELLOW}File already exists: ${outPath}${COLOR_RESET}`
        );
        return;
      }
      const recordsList = await promptRecordList();
      const recordRows = recordsList.map(({ name, type, columnType = "varchar", length = 0 }) =>
        length === 0
          ? `  @IsNotEmpty({ message: "${toHeaderCase(name)} is required" })\n  @Column({ type: "${columnType}" })\n  ${toSnakeCase(name)}!: ${type};`
          : `  @IsNotEmpty({ message: "${toHeaderCase(name)} is required" })\n  @Column({ type: "${columnType}", length: ${length} })\n  ${toSnakeCase(name)}!: ${type};`
      );
      const defaultRecord = `  @Column({ type: "uuid", default: uuid() })\n  ${toSnakeCase(moduleName)}_id: string;`

      content = content.replace(/{{records_list}}/g, `\n${defaultRecord}\n\n${recordRows.join("\n\n")}\n`);
    } else if (name === "modules") {
      const baseDir = path.join(destinationDir, toSnakeCase(moduleName));
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
        console.log(
          `${COLOR_GREEN}Created directory: ${baseDir}${COLOR_RESET}`
        );
      }
      const innerDir = path.basename(path.dirname(tPath));
      const outPathDir = path.join(baseDir, innerDir);
      if (!fs.existsSync(outPathDir)) {
        fs.mkdirSync(outPathDir, { recursive: true });
        console.log(`${COLOR_GREEN}Created directory: ${outPathDir}${COLOR_RESET}`);
      }

      const basename = path
        .basename(tPath)
        .replace("template", "ts")
        .replace("module", moduleName);
      outPath = path.join(outPathDir, basename);

      if (fs.existsSync(outPath)) {
        console.log(
          `${COLOR_YELLOW}File already exists: ${outPathDir}${COLOR_RESET}`
        );
        return;
      }
    } else {
      console.log(`${COLOR_YELLOW}Template not Found!${COLOR_RESET}`);
      return;
    }

    outputs.push({ outPath, content });
  }

  // Write output files
  outputs.forEach(({ outPath, content }) => {
    fs.writeFileSync(outPath, content, "utf-8");
    console.log(`${COLOR_GREEN}File created: ${outPath}${COLOR_RESET}`);
  });
  console.log(
    `${COLOR_GREEN}${toPascalCase(name)} ${moduleName} created successfully!${COLOR_RESET}`
  );
}

// ─── MAIN EXECUTION FLOW ───────────────────────────────────────────────────

async function runGenerator(): Promise<void> {
  try {
    const category = await promptCategory();
    const template = shadowConfig.template.find(
      (x: TemplateDir) => x.name === category
    );

    if (category === "entity" || category === "modules") {
      if (!template) {
        console.error(`${COLOR_RED}Invalid category selected!${COLOR_RESET}`);
        return;
      }
      const moduleName = await promptModuleName(category);
      const mapper: Record<string, string> = {
        module_name: moduleName,
        route_name: toPathCase(moduleName),
        module_name_camel_case: toCamelCase(moduleName),
      };

      // Generate template files
      await generateTemplate(template, mapper);

      if (category === "modules") {

        // Ask user if they want to generate an entry file for the module
        const { generateEntry } = await inquirer.prompt([
          {
            type: "confirm",
            name: "generateEntry",
            message: "Do you want to generate an entry file for the module?",
            default: true,
          },
        ]);
        // Generate module entry if requested
        if (generateEntry) {
          const entityTemplate = shadowConfig.template.find(
            (x: TemplateDir) => x.name === "entity"
          );
          if (!entityTemplate) {
            console.error(`${COLOR_RED}Entity template not found!${COLOR_RESET}`);
            return;
          }
          await generateTemplate(entityTemplate, mapper);
        }
      }
    }
    if (category === "route:list") {
      const port = parseInt(process.env.PORT || '5010', 10);
      const app = new App(port);
      app.getRoutesList();
    }
  } catch (error) {
    console.error(`${COLOR_RED}Error: ${error}${COLOR_RESET}`);
  }
}

runGenerator();
