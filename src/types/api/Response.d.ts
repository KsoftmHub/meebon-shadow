import { InferAttributes, } from "sequelize";
import { ApiControllerExtrasProps } from "./ApiController";
import { Paginate, PaginationMeta } from "./Handlers";
import { STATUS_CODE } from "@meebon/lib/helper/RouteHelper.ts";


export interface MetaInfoProps extends Partial<PaginationMeta> {
  [key: string]: unknown;
  message: string;
  statusCode: STATUS_CODE;
}

export interface ResponseProps {
  status: boolean;
  length?: number;
  data?: unknown;
  meta: MetaInfoProps;
}

export interface ErrorResponseProps extends Omit<Omit<ResponseProps, "data">, "length"> {
  errorData: unknown;
  // TODO: need to update
  // error: AppError;
  error: Error;
  errorStack: unknown;
}

export interface BuildResponseProps {
  send: (status: boolean) => void;
  error: (extras: ApiControllerExtrasProps) => void;
  serverError: (extras: ApiControllerExtrasProps) => void;
  noParamError: (extras: ApiControllerExtrasProps) => void;
  noFileError: (extras: ApiControllerExtrasProps) => void;
  noIdError: (extras: ApiControllerExtrasProps) => void;
  noTokenError: (extras: ApiControllerExtrasProps) => void;
  noAccessError: (extras: ApiControllerExtrasProps) => void;
  duplicateKeyError: (extras: ApiControllerExtrasProps) => void;
  noDataError: (extras: ApiControllerExtrasProps) => void;
}

export interface BuildResponseOptionPros {
  data?: unknown;
  meta: Partial<MetaInfoProps>;
}