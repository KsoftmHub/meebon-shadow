#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

// Define the CLI program
program
  .version('1.0.0')
  .description('CLI tool for creating microservice projects');

// Command: create <service-name>
program
  .command('create <serviceName>')
  .description('Creates a new microservice project from a template')
  .option('-t, --template <templatePath>', 'Path to the template project', './template')
  .action(async (serviceName, options) => {
    const templatePath = options.template;
    const destinationPath = path.join(process.cwd(), 'services', serviceName);

    try {
      // Check if the destination directory already exists
      if (fs.existsSync(destinationPath)) {
        console.error(chalk.red(`Error: Directory '${destinationPath}' already exists.`));
        return;
      }

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: 'Enter a description for the service:',
          default: 'A new microservice',
        },
      ]);

      // Copy the template to the destination
      fs.copySync(templatePath, destinationPath);

      // Rename package.json, and modify file
      const packageJsonPath = path.join(destinationPath, 'package.json');
      const tsConfigPath = path.join(destinationPath, 'tsconfig.json');

      const parsedServiceName = serviceName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const scopedName = `@my-microservices/${parsedServiceName}`;

      // Update the service name in the `package.json` file
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
      const updatedPackageJsonContent = packageJsonContent.replace('"name": ""', `"name": "${scopedName}"`);
      const updatedDescriptionPackageJsonContent = updatedPackageJsonContent.replace(
        '"description": "Microservice template"',
        `"description": "${answers.description}"`
      );
      fs.writeFileSync(packageJsonPath, updatedDescriptionPackageJsonContent, 'utf-8');

      // Update the `tsconfig.json` file
      const tsConfigJsonContent = fs.readFileSync(tsConfigPath, 'utf-8');
      const updatedTsConfigJsonContent = tsConfigJsonContent.replace(/"outDir": "dist"/, `"outDir": "../../dist/${parsedServiceName}"`);
      fs.writeFileSync(tsConfigPath, updatedTsConfigJsonContent, 'utf-8');

      console.log(chalk.green(`Successfully created microservice project '${serviceName}' in '${destinationPath}'.`));
    } catch (error) {
      console.error(chalk.red(`Error creating microservice project: ${error.message}`));
    }
  });

// Parse the command-line arguments
program.parse(process.argv);

// If no command is specified, display help
if (!process.argv.slice(2).length) {
  program.help();
}