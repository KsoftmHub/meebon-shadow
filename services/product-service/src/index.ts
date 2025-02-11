import express from 'express';
import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Product Service is running!');
});

app.listen(port, () => {
  console.log(`Product Service listening on port ${port}`);
});
