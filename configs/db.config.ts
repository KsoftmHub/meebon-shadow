import * as dotenv from 'dotenv';
import { DatabaseType, DataSourceOptions } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: process.env.DATABASE_TYPE || "mysql" as any,
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'test',
  synchronize: process.env.DATABASE_SYNCHRONIZE === "true" ? true : false,
  logging: process.env.DATABASE_LOGGING === 'true' || process.env.NODE_ENV === 'development',
};
