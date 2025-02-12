import path from "path";
import fs from 'fs/promises';
import { DataSource } from "typeorm";

import { dbConfig } from "../../configs/db.config";
import { getTsSourcePath } from "../core/helper";

const migrationsList = await getTsSourcePath("src/migration");
const entitiesList = await getTsSourcePath("src/entity");
const subscriberList = await getTsSourcePath("src/subscriber");

export const AppDataSource = new DataSource({
  ...dbConfig,
  migrations: [...migrationsList],
  entities: [...entitiesList],
  subscribers: [...subscriberList]
});