import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public login = (req: Request, res: Response, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      next(error);
    }
  };

  public logincb = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
