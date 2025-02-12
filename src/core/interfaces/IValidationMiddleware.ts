import { Request, Response, NextFunction } from "express";

export interface IValidationMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}