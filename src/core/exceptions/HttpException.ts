import { IApiControllerExtrasProps } from "../interfaces/IApiControllerProps";

export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public data: any;
  public extras: IApiControllerExtrasProps;

  constructor({ statusCode, message, data, extras }: HttpExceptionProps) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.extras = extras;

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
}
