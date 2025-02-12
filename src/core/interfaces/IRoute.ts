import { Router } from "express";
import { IValidationMiddleware } from "./IValidationMiddleware";

export interface IRoute {
  router: Router;
  initializeRoutes(): void;
  validateRequest: IValidationMiddleware;
}