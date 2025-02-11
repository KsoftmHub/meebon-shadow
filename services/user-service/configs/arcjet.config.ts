import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const arcjetConfig = {
  token: process.env.ARCJET_TOKEN || 'your-arcjet-token',
  trustProxy: process.env.NODE_ENV === 'production',
};
