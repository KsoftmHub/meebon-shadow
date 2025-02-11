import * as dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "3306", 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  charset: "utf8mb4",
  collation: "utf8mb4_unicode_ci"
};
