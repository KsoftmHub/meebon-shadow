import { AppErrorProps } from "../interfaces/Errors";
import { IApiControllerExtrasProps } from "../interfaces/IApiControllerProps";

import { DUPLICATE_KEY, NO_ACCESS, NO_DATA, NO_FILE, NO_ID_FOUND, NO_PARAMS, NO_TOKEN, SERVER_ERROR, STATUS_CODE } from "./helpers";
import { AppErrorBasicProps, HttpException } from "./HttpException";


const SendAppError: (data: AppErrorProps) => Promise<void> = async ({ data, message, statusCode, extras }) => {
  return extras.next(new HttpException({ message, statusCode, data }));
}

export const InternalServerError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: SERVER_ERROR, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR })
}

export const NoParameterError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: NO_PARAMS, statusCode: STATUS_CODE.BAD_REQUEST })
}

export const NoFileError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: NO_FILE, statusCode: STATUS_CODE.BAD_REQUEST })
}

export const NoIdError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: NO_ID_FOUND, statusCode: STATUS_CODE.BAD_REQUEST })
}

export const NoTokenError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: NO_TOKEN, statusCode: STATUS_CODE.UNAUTHORIZED })
}

export const NoAccessError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: NO_ACCESS, statusCode: STATUS_CODE.FORBIDDEN })
}

export const DuplicateKeyError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: DUPLICATE_KEY, statusCode: STATUS_CODE.CONFLICT })
}

export const NoDataError: (data: AppErrorBasicProps) => Promise<void> = async ({ extras }) => {
  return SendAppError({ extras, data: null, message: NO_DATA, statusCode: STATUS_CODE.NOT_FOUND })
}

export default SendAppError;