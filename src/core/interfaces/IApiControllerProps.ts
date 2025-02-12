import { NextFunction } from "express";

export interface IApiControllerProps {
  req: Request;
  res: Response;
  extras: IApiControllerExtrasProps;
}

export interface IApiControllerExtrasProps {
  next: NextFunction;
}
