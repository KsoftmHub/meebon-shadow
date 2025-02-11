import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
};
