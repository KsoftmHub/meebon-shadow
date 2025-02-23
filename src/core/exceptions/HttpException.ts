import { ValidationError } from "class-validator";
import { IApiControllerExtrasProps } from "../interfaces/IApiControllerProps";

export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public data: any;
  public validateMessage: any;
  public extras: IApiControllerExtrasProps;

  constructor({ statusCode, message, data, extras, error }: HttpExceptionProps) {
    super(message);
    this.statusCode = statusCode;
    this.message = message ?? error.message;
    this.data = data;
    this.extras = extras;
    this.stack = error?.stack;
    this.name = error?.name;

    if (Array.isArray(error)) {
      this.name = "Validation Error";
      let validateList: any = error?.filter(x => x instanceof ValidationError)
      if (validateList?.length > 0) {
        validateList = validateList?.flatMap((x: any) => x.constraints).flatMap((x: any) => x);
        const result = validateList.reduce((acc: any, curr: any) => {
          const [[key, obj]] = Object.entries(curr);
          acc[key] = obj;
          return acc;
        }, {});
        this.validateMessage = result;
      }
    }
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
