import * as express from "express";
import { Paginate, PaginationMeta } from "./api/Handlers.js";
import { ENV_NAME } from "../helper/EnvironmentHelper.ts";
import { Dialect } from "sequelize";
import { BuildResponseOptionPros, BuildResponseProps } from "./api/Response.js";


declare global {
  export namespace Express {
    interface Request {
      auth: unknown;
      paginate: Partial<Paginate>;
      meta: Partial<PaginationMeta>;
    }
    interface Response {
      build(options?: BuildResponseOptionPros): BuildResponseProps;
      // build(data: unknown, meta: MetaInfoProps, status?: boolean): Promise<void>;
    }
  }

  export namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: ENV_NAME;
      PORT: number;
      TZ: string | undefined;
      CHARSET: string;
      COLLATE: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REFRESH_TOKEN: string;
      EMAIL_ADDRESS: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: number;
      DATABASE: string;
      DIALECT: Dialect;
      AUTH_TOKEN_KEY: string;
      REQ_ENCRYPTION_KEY: string;
    }
  }
}

export { }