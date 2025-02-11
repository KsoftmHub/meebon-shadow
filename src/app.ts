import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Routes } from './routes';
import { handleError } from "./utils/errorHandler";
import { validateRequest } from "./utils/requestValidator";

class App {
  public app: Application;
  public port: number;

  constructor(port: number, routes: Routes[]) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(cors()); // Enable CORS
    this.app.use(helmet()); // Secure HTTP headers
    this.app.use(compression()); // Compress responses
    this.app.use(express.json()); // Parse JSON request bodies
    this.app.use(validateRequest);
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(handleError);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;