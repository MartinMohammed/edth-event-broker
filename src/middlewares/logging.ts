// logging middleware
import { Request, Response, NextFunction } from "express";

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { loggingMiddleware };
