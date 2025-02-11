import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@my-microservices/shared/src/entities/User";
import { dbConfig } from "./configs/db.config";
import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [User],
  type: "mysql"
});
