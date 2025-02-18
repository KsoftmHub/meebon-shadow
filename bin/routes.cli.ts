#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import shadowConfig from "../shadow.config.json";
import { pathToFileURL } from 'url';

async function cli() {
  if (!shadowConfig) {
    console.log("File not found!");
    return;
  }

  const port = parseInt(process.env.PORT || '5010', 10);
  let appPath = path.join(shadowConfig?.app ?? "");

  appPath = path.resolve(appPath);
  if (!fs.existsSync(appPath)) {
    console.log(`Express App not found!`);
    return;
  }
  appPath = pathToFileURL(appPath).href;
  let App = await import(appPath);
  const app = new App.default(port);
  app?.getRoutesList();
}

cli();
