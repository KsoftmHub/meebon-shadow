import "reflect-metadata";
import { DataSource } from "typeorm";
import { dbConfig } from "./config/db.config";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  ...dbConfig,
  // entities: [__dirname + "/entity/**/*.ts"],
  entities: [User],
  migrations: [],
  // migrations: [__dirname + "src/migration/**/*.ts"],
  subscribers: [],
});

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "test",
//   password: "test",
//   database: "test",
//   synchronize: false,
//   logging: false,
//   entities: [User],
//   migrations: [],
//   subscribers: [],
// })