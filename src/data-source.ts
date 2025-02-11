import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User"; // Example entity
import { Post } from "./entities/Post"; // Example entity
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Post],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })
