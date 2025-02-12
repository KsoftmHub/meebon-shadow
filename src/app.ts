import express, { Application, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Container } from "typedi";
import { errorHandler } from "./core/middlewares/ErrorHandler";
import { AppDataSource } from './sources/data-source';
import ResponseHandler from './core/handlers/ResponseHandler';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './modules/user/controllers/UserController';
import { IBaseResponse } from './core/interfaces/Request';
import { STATUS_CODE } from './core/exceptions/helpers';

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = createExpressServer({
      development: false,
      routePrefix: "/api/v1",
      controllers: [
        UserController
      ],

    });
    this.port = port;

    this.initializeMiddlewares();
    this.initializeExtraRoute();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(helmet());
    this.app.use(compression());

    // bind the res.sendRes function here
    this.app.use(ResponseHandler);
  }

  private initializeExtraRoute(): void {
    this.app.use('/public', express.static("public"));
    this.app.use('*', (req, res: IBaseResponse, next) => {
      res.sendRes([], { message: "error", status: STATUS_CODE.NOT_FOUND })
      console.log({ req, res });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async listen(): Promise<void> {

    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!")
        this.app.listen(this.port, () => {
          console.log(`App listening on the port ${this.port}`);
        });
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err)
      })
  }
}

export default App;