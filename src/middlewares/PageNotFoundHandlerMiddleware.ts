import { STATUS_CODE } from "@lib/core/exceptions/helpers";
import { HttpException } from "@lib/core/exceptions/HttpException";
import { IBaseRequest, IBaseResponse } from "@lib/core/interfaces/Request";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

import { NextFunction } from 'express';
import path from "path";
import { config } from "dotenv";

config()

const { HTML_ERROR_PAGE_FLAG } = process.env;

@Middleware({ type: 'after' })
export class PageNotFoundHandlerMiddleware implements ExpressMiddlewareInterface {
  use(req: IBaseRequest, res: IBaseResponse, next?: NextFunction): void {
    if (!res.headersSent) {
      if (HTML_ERROR_PAGE_FLAG === "true") {
        const notFoundPage = path.resolve("./templates/404.html")
        res.status(STATUS_CODE.NOT_FOUND).sendFile(notFoundPage);
      } else {
        res.status(STATUS_CODE.NOT_FOUND).send({
          status: false,
          meta: {
            message: "Page not found!",
            status: STATUS_CODE.NOT_FOUND,
          }
        });
      }
    }
  }

}
