import { config } from "dotenv";
import compression from "compression";
import cors from "cors";
// import { NextFunction, Request, Response } from "express-serve-static-core";
import express, { NextFunction, Request, Response } from "express";
import appRoute from "./routes/index.js";
// import ErrorHandler from "./handler/ErrorHandler";
// import ResponseHandler from "./handler/ResponseHandler";
// import PaginationHandler from "./handler/PaginationHandler";
// import { STATUS_CODE } from "./helper/RouteHelper";
// import { initializeDatabase } from "./models";
// import RoutHandler from "./handler/RoutHandler";
import fs from 'fs';
// import configEnv from './config/config';
import path from "path";
import { STATUS_CODE } from "./helper/RouteHelper.js";
import ErrorResponseHandler from "@meebon/packages/error/lib/index.js";
import { jwtAuth } from "@meebon/packages/jwt/lib/index.js";
import PaginationHandler from "@meebon/packages/utils/lib/PaginationHandler.js";
import ResponseHandler from "@meebon/packages/utils/lib/ResponseHandler.js";
// import { STATUS_CODE } from "../helper/RouteHelper.js";

// configure the sequelize config as json
// const configPath = path.join(__dirname, "/config/config.json");
// console.log({ configEnv, configPath, __dirname });

// if (fs.existsSync(configPath)) {
//   fs.unlinkSync(configPath);
// }
// fs.writeFileSync(configPath, JSON.stringify(configEnv, null, 2), { encoding: "utf8", flag: 'wx' });

// configure the dotenv
config();

const port = process.env.PORT || 5005;
const app: express.Application = express();

// configure the cors and compression
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(ResponseHandler);
app.use(PaginationHandler);
// app.use(dateParser);

app.use(jwtAuth(({ payload, req, res, next }) => {
  //* find the model and set the user info


  next();
}));


// handlers attachments
// app.use(ResponseHandler);
// app.use(PaginationHandler);


// database config
// initializeDatabase();

// base
app.use('/api/v1', appRoute);
app.use('/public/v1', express.static('public'));

// app.all('*', RoutHandler(async ({ req, res, extras }) => {
//   return res.build({
//     meta: {
//       message: "Page Not Found!",
//       statusCode: STATUS_CODE.NOT_FOUND,
//     }
//   }).error(extras);
// }));
app.all('*', (req, res, next) => {
  res.status(404).json({
    meta: {
      message: "Page Not Found!",
      statusCode: STATUS_CODE.NOT_FOUND,
    }
  });
});

app.use(ErrorResponseHandler);

app.listen(port, () => {
  return console.log(`Server started on port ${port}`);
});