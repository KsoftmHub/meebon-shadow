import express from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Microservice Template!');
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!")
    app.listen(port, () => {
      console.log(`Microservice Template app listening on port ${port}`);
    });
  })
  .catch((error: any) => console.log(error));
