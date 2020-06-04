import { Request, NextFunction, Response } from "express";

// wrap async route handlers with this to allow catch all error handling
export const asyncRoute = (f: (req: Request, res: Response, next: NextFunction) => {}) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(f(req, res, next)).catch(next);
