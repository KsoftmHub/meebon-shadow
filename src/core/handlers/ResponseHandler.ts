import e, { NextFunction, Request, Response } from "express";
import { IBaseRequest, IBaseResponse } from "../interfaces/Request";
import { BuildResponseOptionPros } from "../interfaces/Response";
import { IApiControllerExtrasProps, IApiControllerProps } from "../interfaces/IApiControllerProps";
import SendAppError, { DuplicateKeyError, InternalServerError, NoAccessError, NoDataError, NoFileError, NoIdError, NoParameterError, NoTokenError } from "../exceptions/AppError";
import { SERVER_ERROR } from "../exceptions/helpers";


const ResponseHandler = (req: IBaseRequest, res: IBaseResponse, next: NextFunction) => {
  // res.build = (options?: BuildResponseOptionPros) => {
  //   return {
  //     send: (status: boolean = true) => {
  //       const length = options?.data && Array.isArray(options.data) ? options.data.length : undefined;
  //       return res.status(options?.meta?.statusCode as unknown as number).send({
  //         status,
  //         length,
  //         data: options?.data,
  //         meta: options?.meta,
  //       });
  //     },
  //     error: (extras: IApiControllerExtrasProps) => {
  //       return SendAppError({
  //         message: options?.meta.message ?? SERVER_ERROR,
  //         statusCode: options?.meta?.statusCode ?? 500,
  //         data: null,
  //         extras
  //       });
  //     },
  //     serverError: (extras: IApiControllerExtrasProps) => {
  //       return InternalServerError({ extras });
  //     },
  //     noParamError: (extras: IApiControllerExtrasProps) => {
  //       return NoParameterError({ extras });
  //     },
  //     noFileError: (extras: IApiControllerExtrasProps) => {
  //       return NoFileError({ extras });
  //     },
  //     noIdError: (extras: IApiControllerExtrasProps) => {
  //       return NoIdError({ extras });
  //     },
  //     noTokenError: (extras: IApiControllerExtrasProps) => {
  //       return NoTokenError({ extras });
  //     },
  //     noAccessError: (extras: IApiControllerExtrasProps) => {
  //       return NoAccessError({ extras });
  //     },
  //     duplicateKeyError: (extras: IApiControllerExtrasProps) => {
  //       return DuplicateKeyError({ extras });
  //     },
  //     noDataError: (extras: IApiControllerExtrasProps) => {
  //       return NoDataError({ extras });
  //     }
  //   }
  // }
  // next();

  res.sendRes = (data, meta) => {
    const length = data && Array.isArray(data) && data.length || undefined;
    res.status(meta.status || 200).send({
      status: true,
      length,
      meta: { ...req.meta, ...meta },
      data,
    });
  }
  next();
}

export default ResponseHandler;
