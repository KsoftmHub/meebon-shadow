import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Action, useExpressServer } from 'routing-controllers';
import expressListRoutes from 'express-list-routes';
import { decryptMiddleware, encryptionMiddleware, MeebonCrypto } from "@meebon/meebon-crypto/dist";

import { AppDataSource } from '@lib/sources/data-source';
// import ResponseHandler from '@lib/core/handlers/ResponseHandler';
import { UserController } from '@lib/modules/user/controllers/UserController';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
import { RequestHandlerMiddleware } from './middlewares/RequestHandlerMiddleware';
import { PageNotFoundHandlerMiddleware } from './middlewares/PageNotFoundHandlerMiddleware';

import { config as dotEntConfig } from "dotenv";

import jwt from "jsonwebtoken";
import { LoggingMiddleware } from './middlewares/LoggingMiddleware';

const { privateKey, publicKey } = MeebonCrypto.generateKeyPair(2048);
const { NODE_ENV } = process.env;

// const data = MeebonCrypto.init({
//   privateKeyPem: privateKey,
//   publicKeyPem: publicKey
// });

dotEntConfig()

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    // Create a new Express instance
    this.port = port;
    this.app = express();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(helmet());
    this.app.use(compression());

    // Encrypt the request (uncomment if needed)
    // this.app.use(EncryptionMiddleware({ privateKey, publicKey, forRequest: true }));
    // this.app.use(express.text({ type: "x-require-encryption" }));
    // Encrypt the response
    // this.app.use(decryptMiddleware({ privateKey }));
    // this.app.use(encryptionMiddleware({ publicKey }));

    // Bind the custom res.sendRes function
    // this.app.use(ResponseHandler);
  }

  private initializeExtraRoute(): void {
    // Serve static files from the public directory
    this.app.use('/public', express.static("public"));
  }

  public getRoutesList() {
    expressListRoutes(this.app, {});
  }

  public async listen(): Promise<void> {
    // Initialize global middlewares before setting up controllers
    this.initializeMiddlewares();
    // Initialize extra routes after controllers
    this.initializeExtraRoute();


    await AppDataSource.initialize().then(() => {
      console.log("Data Source has been initialized!");
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    }).catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

    // Set up routing-controllers on the Express instance
    useExpressServer(this.app, {
      development: NODE_ENV === "development",
      routePrefix: "/api/v1",
      controllers: [
        UserController,
      ],
      defaultErrorHandler: false,
      // authorizationChecker: [],
      authorizationChecker: async (action: Action, roles: string[]) => {
        const authorization = action.request.headers['authorization'];

        // const user = await getEntityManager().findOneByToken(User, token);
        // if (user && !roles.length) return true;
        // if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;

        if (!authorization?.startsWith('Bearer ')) {
          return false;
        }

        const token = authorization?.split(' ').pop();
        if (!token) {
          return false;
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return true;
      },
      currentUserChecker: async (action: Action) => {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const token = action.request.headers['authorization'];


        return token;
      },
      middlewares: [
        // before
        RequestHandlerMiddleware,

        // after
        LoggingMiddleware,
        PageNotFoundHandlerMiddleware,
        ErrorHandlerMiddleware,
      ]
    });
  }
}

export default App;
