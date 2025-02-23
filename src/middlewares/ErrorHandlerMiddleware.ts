import { FORBIDDEN, UNAUTHENTICATED } from "@lib/core/constants";
import { STATUS_CODE } from "@lib/core/exceptions/helpers";
import { HttpException } from "@lib/core/exceptions/HttpException";
import { IBaseRequest, IBaseResponse } from "@lib/core/interfaces/Request";
import { BadRequestError, ExpressErrorMiddlewareInterface, Middleware, UnauthorizedError, ForbiddenError } from "routing-controllers";
const { NODE_ENV } = process.env;

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(err: any, req: IBaseRequest, res: IBaseResponse, next: (err: any) => any) {
    if (NODE_ENV !== "production") {
      console.error(err.stack);
    }

    let status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";

    if (err instanceof HttpException) {
      status = err.statusCode;
      message = err.message;
    }
    if (err.httpCode === STATUS_CODE.UNAUTHORIZED || status === STATUS_CODE.UNAUTHORIZED) {
      status = STATUS_CODE.UNAUTHORIZED;
      message = UNAUTHENTICATED;
    }
    if (err.httpCode === STATUS_CODE.FORBIDDEN || status === STATUS_CODE.FORBIDDEN) {
      status = STATUS_CODE.FORBIDDEN;
      message = FORBIDDEN;
    }

    return res.status(status).json({
      status: false,
      meta: {
        message,
        statusCode: status,
        error: err.message,
        status: err.stack,
        validationError: err.validateMessage,
      }
    });
  }
}
