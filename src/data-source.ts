import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { dbConfig } from "./config/db.config";

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});