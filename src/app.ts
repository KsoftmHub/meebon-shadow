import express, { Application, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { useExpressServer } from 'routing-controllers';
import expressListRoutes from 'express-list-routes';
import { decryptMiddleware, encryptionMiddleware, MeebonCrypto } from "@meebon/meebon-crypto/dist";

import { errorHandler } from "@lib/core/middlewares/ErrorHandler";
import { AppDataSource } from '@lib/sources/data-source';
import ResponseHandler from '@lib/core/handlers/ResponseHandler';
import { UserController } from '@lib/modules/user/controllers/UserController';
import { IBaseResponse } from '@lib/core/interfaces/Request';
import { STATUS_CODE } from '@lib/core/exceptions/helpers';
import { HttpException } from './core/exceptions/HttpException';

const { privateKey, publicKey } = MeebonCrypto.generateKeyPair(2048);

// const data = MeebonCrypto.init({
//   privateKeyPem: privateKey,
//   publicKeyPem: publicKey
// });

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    // Create a new Express instance
    this.app = express();

    // Initialize global middlewares before setting up controllers
    this.initializeMiddlewares();

    // Set up routing-controllers on the Express instance
    useExpressServer(this.app, {
      development: false,
      routePrefix: "/api/v1",
      controllers: [UserController],
    });

    // Initialize extra routes and error handling after controllers
    this.initializeExtraRoute();
    this.initializeErrorHandling();

    this.port = port;
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(helmet());
    this.app.use(compression());

    // Encrypt the request (uncomment if needed)
    // this.app.use(EncryptionMiddleware({ privateKey, publicKey, forRequest: true }));
    this.app.use(express.text({ type: "x-require-encryption" }));
    // Encrypt the response
    this.app.use(decryptMiddleware({ privateKey }));
    this.app.use(encryptionMiddleware({ publicKey }));

    // Bind the custom res.sendRes function
    this.app.use(ResponseHandler);
  }

  private initializeExtraRoute(): void {
    // Serve static files from the public directory
    this.app.use('/public', express.static("public"));

    // Catch-all route for undefined endpoints
    this.app.use('*', (req, res: IBaseResponse, next) => {
      throw new HttpException({
        message: `page not Found`,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    });
  }

  private initializeErrorHandling(): void {
    // Error handling middleware should come last
    this.app.use(errorHandler);
  }

  public getRoutesList() {
    expressListRoutes(this.app, {});
  }

  public async listen(): Promise<void> {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
        this.app.listen(this.port, () => {
          console.log(`App listening on the port ${this.port}`);
        });
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err);
      });
  }
}

export default App;
