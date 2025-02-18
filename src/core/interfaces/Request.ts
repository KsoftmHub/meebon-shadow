import { Request, Response } from "express";
import { BuildResponseOptionPros, BuildResponseProps } from "./Response";

export interface IPaginateConfig {
  offset: number
  limit: number
}

export interface IPaginationConfig {
  page: number
  size: number
}


interface IMeta extends Partial<IPaginationConfig> {
  message: string;
  status: number;
  total?: number;
}


export interface IBaseResponse extends Response {
  auth?: any;
  paginate?: Partial<IPaginateConfig>;
  meta?: Partial<IPaginationConfig>;


  // build(options?: BuildResponseOptionPros): BuildResponseProps;
  sendRes?: (data?: any[] | object | undefined, meta?: IMeta | undefined) => void;
}

export interface IBaseRequest extends Request {
  auth?: {
    user_id: string;
  };
  branch?: {
    branch_id: string;
  };
  device?: {
    device_id: string;
  };
  meta?: IPaginationConfig;
  paginate?: IPaginationConfig;
}
