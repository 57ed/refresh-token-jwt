import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';
import * as dotenv from 'dotenv'

dotenv.config()
// console.log(`Conexão && DOTENV: ${process.env.JWT_TOKEN}`);



const app = express();
app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: 'Error',
      message: error.message
    });
  }
);

app.listen(3000, () => console.log('🚀️ Server running port 3000'));
