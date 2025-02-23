import { Request, Response, NextFunction } from 'express';
import { HttpException } from "../exceptions/HttpException";
const { NODE_ENV } = process.env;

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (NODE_ENV !== "production") {
    console.error(err.stack);
  }

  let status = 500;
  let message = "Something went wrong!";

  if (err instanceof HttpException) {
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).json({
    status: false,
    meta: {
      message,
      error: err.message,
      status: err.stack,
    }
  });
};
