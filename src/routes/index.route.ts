import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import passport from 'passport';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}login`, this.indexController.login, passport.authenticate('samlStrategy'));
    this.router.get(`${this.path}login/callback`, this.indexController.login, passport.authenticate('samlStrategy'), this.indexController.logincb);
  }
}

export default IndexRoute;
