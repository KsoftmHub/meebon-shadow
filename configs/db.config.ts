import * as dotenv from 'dotenv';
import { DatabaseType, DataSourceOptions } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: process.env.DB_TYPE || "mysql" as any,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  synchronize: process.env.DB_SYNC === "true" ? true : false,
  logging: process.env.NODE_ENV === 'development',
};