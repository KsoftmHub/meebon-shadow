import { config } from 'dotenv';

config();

// eslint-disable-next-line no-undef
const { PROD_DB_USERNAME, PROD_DB_PASSWORD, PROD_DB_NAME, PROD_DB_HOSTNAME } = process.env;


// eslint-disable-next-line no-undef
/** @typedef {import('sequelize').Options} Options */
/** @typedef {import('../helper/EnvironmentHelper.ts').ENV_NAME} ENV_NAME */
/** @type {{[key in ENV_NAME]: Partial<Options>}} */
export default {
  development: {
    "username": "root",
    "password": "",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  test: {
    "username": "root",
    "password": "",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  local: {
    "username": "root",
    "password": "",
    "database": "database_local",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOSTNAME,
    dialect: 'mysql',
  },
}
