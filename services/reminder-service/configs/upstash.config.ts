import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const upstashConfig = {
  redisUrl: process.env.UPSTASH_REDIS_REST_URL || 'your_upstash_redis_url',
  redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || 'your_upstash_redis_token',
};
