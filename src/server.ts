import "reflect-metadata"; // Must be imported before TypeDI
import { Container } from "typedi"; // Import Container
import App from "./app";
import * as dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const app = new App(port); // Removed Container.get()

app.listen();
