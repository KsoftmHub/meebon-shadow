import path from "path";
import fs from 'fs/promises';
import { DataSource } from "typeorm";

export async function getTsSourcePath(dir: string): Promise<string[]> {
  const files: string[] = [];
  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  const currentPath = path.resolve(dir);
  await walk(currentPath);
  return files;
}