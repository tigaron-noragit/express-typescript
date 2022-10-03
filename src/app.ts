import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import passport from 'passport';
import fs from 'fs';
import { connect, set } from 'mongoose';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import session from 'express-session';
import { Strategy } from 'passport-saml';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public samlStrategy: Strategy;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.samlStrategy = new Strategy(
      {
        callbackUrl: 'https://localhost/login/callback',
        entryPoint: 'https://kc.beta.lyrid.io/realms/dev/protocol/saml',
        issuer: 'express',
        cert: fs.readFileSync('nginx/ssl/localhost-cert.pem', 'utf-8'),
        privateKey: fs.readFileSync('nginx/ssl/localhost-key.pem', 'utf-8'),
      },
      (profile, done) => {
        logger.info(JSON.stringify(profile));
        return done(null, profile);
      },
    );

    this.connectToDatabase();
    this.passportSerialization();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options);
  }

  private passportSerialization() {
    passport.serializeUser(function (user, done) {
      logger.info(user);
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      logger.info(user);
      done(null, user);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
      }),
    );
    passport.use('samlStrategy', this.samlStrategy);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
