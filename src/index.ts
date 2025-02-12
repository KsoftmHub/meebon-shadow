import express, { Application, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Container } from "typedi"; // Import Container
import { UserController } from "./controllers/UserController"; // Import the controller
import { errorHandler } from "./utils/ErrorHandler";
import { AppDataSource } from "./data-source";

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(); // Initialize controllers using TypeDI
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ credentials: true, origin: "*" }));
    this.app.use(helmet());
    this.app.use(compression());
  }

  private initializeControllers(): void {
    const router = Router();
    const userController = Container.get(UserController); // Get the controller instance from TypeDI

    // Define routes
    router.get('/users', (req, res) => userController.getAll(req, res));
    router.get('/users/:id', (req, res) => userController.getById(req, res));
    router.post('/users', (req, res) => userController.create(req, res));
    router.put('/users/:id', (req, res) => userController.update(req, res));
    router.delete('/users/:id', (req, res) => userController.delete(req, res));

    this.app.use('/', router);
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
