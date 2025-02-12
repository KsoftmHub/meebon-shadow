import { DataSource } from "typeorm";
import { getTsSourcePath } from "../core/helper";

const migrationsList = await getTsSourcePath("src/migration");
const entitiesList = await getTsSourcePath("src/entity");
const subscriberList = await getTsSourcePath("src/subscriber");


console.table(migrationsList.map((x) => ({ migrationsList: x })));
console.table(entitiesList.map((x) => ({ entitiesList: x })));
console.table(subscriberList.map((x) => ({ subscriberList: x })));

export const MigrationDataSource = new DataSource({
  type: process.env.DB_TYPE || "mysql" as any,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  synchronize: process.env.DB_SYNC === "true" ? true : false,
  logging: process.env.NODE_ENV === 'development',
  migrations: [...migrationsList],
  entities: [...entitiesList],
  subscribers: [...subscriberList]
});