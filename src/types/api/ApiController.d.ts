import { NextFunction, Request, Response } from "express";
import { Transaction } from "sequelize";

export interface ApiControllerProps {
  req: Request;
  res: Response;
  extras: ApiControllerExtrasProps;
}

export interface ApiControllerExtrasProps {
  next: NextFunction;
  transaction: Transaction | undefined;
}