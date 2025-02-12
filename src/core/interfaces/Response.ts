import { HttpException } from "../exceptions/HttpException";
import { IApiControllerExtrasProps } from "./IApiControllerProps";
import { IPaginationConfig } from "./Request";


export interface MetaInfoProps extends Partial<IPaginationConfig> {
  [key: string]: unknown;
  message: string;
  statusCode: number;
}

export interface ResponseProps {
  status: boolean;
  length?: number;
  data?: unknown;
  meta: MetaInfoProps;
}

export interface ErrorResponseProps extends Omit<Omit<ResponseProps, "data">, "length"> {
  errorData: unknown;
  error: HttpException;
  errorStack: unknown;
}


export interface BuildResponseProps {
  send: (status: boolean) => void;
  error: (extras: IApiControllerExtrasProps) => void;
  serverError: (extras: IApiControllerExtrasProps) => void;
  noParamError: (extras: IApiControllerExtrasProps) => void;
  noFileError: (extras: IApiControllerExtrasProps) => void;
  noIdError: (extras: IApiControllerExtrasProps) => void;
  noTokenError: (extras: IApiControllerExtrasProps) => void;
  noAccessError: (extras: IApiControllerExtrasProps) => void;
  duplicateKeyError: (extras: IApiControllerExtrasProps) => void;
  noDataError: (extras: IApiControllerExtrasProps) => void;
}

export interface BuildResponseOptionPros {
  data?: unknown;
  meta: Partial<MetaInfoProps>;
}