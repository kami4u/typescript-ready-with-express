import { Request, NextFunction, Response } from "express";

// wrap async route handlers with this to allow catch all error handling
export const asyncRoute = (callback: (req: Request, res: Response, next: NextFunction) => {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(callback(req, res, next)).catch(next);
  };
};
