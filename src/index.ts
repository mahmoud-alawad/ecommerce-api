import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mainRouter from './routes/index';
import bodyParser from 'body-parser';
import errorHandlerMiddleware from './middlewares/apiError';
import notFound from './middlewares/notFound';
import cookieSession from 'cookie-session';
import nodemailer from 'nodemailer';
import config from '../app.config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const docsApi = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Ecommerce Express API",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "mahmoud alawad",
        url: "https://mahmoudalawad.com",
        email: "awad25.ma@gmail.com",
      },
    },
    servers: [
      {
        url: config.origin,
      },
    ],
  },
  apis: mainRouter,
};
class App {
  public express: express.Application;
  private docsApi: any;
  constructor() {
    this.express = express();
    this.uses();
    this.routes();
    this.middlewares();
    this.serve();
  }

  /**
   * @returns App uses setup
   */
  private uses(): void {
    this.express.use(express.json());
    this.express.use(cors({
      origin: '*',
      credentials: true,
    })); //TODO: { credentials: true }
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieSession({ signed: false, secure: true }));

  }

  /**
   * @returns App routes
  */
  private routes(): void {
    this.express.use('/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(docsApi)
    )
    this.express.use('/api', mainRouter);
  }
  /**
   * @returns Middlewares
   */
  private middlewares(): void {
    this.express.use(errorHandlerMiddleware);
    this.express.use(notFound);
  }

  /**
   * @returns Start express
   */
  private serve() {
    this.express.listen(process.env.PORT as unknown as number || 5000,
      '0.0.0.0', () => { console.log('Express server is running on ' + 'http://0.0.0.0:' + process.env.PORT || 5000) });
  }
}
// (async function () {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// })();

export default new App().express;
