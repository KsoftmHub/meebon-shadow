'use strict';

import { readdirSync } from 'fs';
import path, { basename as _basename, join } from 'path';
import { Sequelize } from 'sequelize-typescript'
import { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { URL } from 'url';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
// const config = require(__dirname + );
import rawConfig from '../config/sequelize.js';

const config = rawConfig["development"];


let sequelize = new Sequelize(config.database ?? "db", config.username ?? "root", config.password, config);

sequelize.addModels([__dirname + '/*.model.ts'], (filename, member) => {
  return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
});

export default sequelize;
