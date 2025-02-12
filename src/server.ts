// import { Containe.rom "typedi"; // Import Container
import App from "./index";
import * as dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const app = new App(port); // Removed Container.get()

app.listen();
