import "reflect-metadata";
import App from "./app";
import * as dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const app = new App(port);

app.listen();