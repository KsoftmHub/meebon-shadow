import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const dbConfig = {
  type: (process.env.DATABASE_TYPE as any) || 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME || 'your_mysql_user',
  password: process.env.DATABASE_PASSWORD || 'your_mysql_password',
  database: process.env.DATABASE_NAME || 'your_mysql_db',
  synchronize: false, // NEVER TRUE IN PRODUCTION
  logging: process.env.NODE_ENV === 'development',
  entities: [/* Your Entities */],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
  charset: "utf8mb4",
  collation: "utf8mb4_unicode_ci"
};
