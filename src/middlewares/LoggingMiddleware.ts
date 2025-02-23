import { STATUS_CODE } from "@lib/core/exceptions/helpers";
import { HttpException } from "@lib/core/exceptions/HttpException";
import { IBaseRequest, IBaseResponse } from "@lib/core/interfaces/Request";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction } from 'express';
import { config } from "dotenv";
import path from "path";

// Load environment variables
config();

@Middleware({ type: 'after' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(req: IBaseRequest, res: IBaseResponse, next: NextFunction): void {
    this.logRequestDetails(req);
    next();
  }

  private logRequestDetails(req: IBaseRequest): void {
    if (process.env.NODE_ENV !== 'production') {
      const { method, path, body, params, query, headers } = req;
      const userId = req?.auth?.user_id || 'N/A';
      console.log("<<----------->> Request Details <<----------->>");
      console.log(`Method: ${method}`);
      console.log(`User ID: ${userId}`);
      console.log(`Path: ${path}`);
      console.log("Request Body:", this.sanitizeLog(body));
      console.log("Request Params:", this.sanitizeLog(params));
      console.log("Query Params:", this.sanitizeLog(query));
      console.log("Headers:", this.sanitizeLog(headers));
      console.log("<<-----X----->> Request Details <<-----X----->>");
    }
  }

  private sanitizeLog(input: any): string {
    if (typeof input === 'object') {
      return JSON.stringify(input, this.replacer, 2);
    }
    return input ? input.toString() : 'N/A';
  }

  private replacer(key: string, value: any): any {
    const sensitiveFields = ['password', 'passwordHash', 'token', 'creditCardNumber'];
    if (sensitiveFields.includes(key)) {
      return '*** Hidden Sensitive Data ***';
    }
    return value;
  }
}
