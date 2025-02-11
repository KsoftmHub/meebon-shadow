import "reflect-metadata";
import App from "./app";
import * as dotenv from 'dotenv';
import UserRoutes from "./routes/user.routes";
dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const app = new App(port, [UserRoutes]);

app.listen();