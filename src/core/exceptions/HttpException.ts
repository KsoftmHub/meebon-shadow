import { IApiControllerExtrasProps } from "../interfaces/IApiControllerProps";

export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public data: any;
  public extras: IApiControllerExtrasProps;

  constructor({ statusCode, message, data, extras, error }: HttpExceptionProps) {
    super(message);
    this.statusCode = statusCode;
    this.message = message ?? error.message;
    this.data = data;
    this.extras = extras;
    this.stack = error?.stack;
    this.name = error?.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export interface AppErrorBasicProps {
  extras?: IApiControllerExtrasProps;
}

export interface HttpExceptionProps extends AppErrorBasicProps {
  message: string;
  statusCode: number;
  data?: unknown;
  error?: Error;
}
