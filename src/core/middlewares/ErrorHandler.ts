import { Request, Response, NextFunction } from 'express';
import { HttpException } from "../exceptions/HttpException";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

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