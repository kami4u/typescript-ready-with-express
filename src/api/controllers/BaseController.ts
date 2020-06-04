// A base "controller" for all request handlers.
// Implementations of this are intended to be a single route handler controller, and not the "traditional" controller pattern where a single controller
// contains multiple router handler methods.
// Based on code in this article:
// https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/
import { Request, Response, NextFunction } from "express";
// import { jsonSerialiserReplacer } from "../utils/general";

export default abstract class BaseController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    this.req = req;
    this.res = res;
    this.next = next;

    try {
      await this.executeImpl();
    } catch (error) {
      // Catch any unhandled controller errors
      return this.error(error);
    }
  }

  protected abstract executeImpl(): Promise<void | any>;

  protected jsonResponse(code: number, message: string) {
    return this.res.status(code).json({ message });
  }

  protected ok<T>(data?: T) {
    if (data !== undefined) {
      const jsonData = JSON.stringify(data);

      return this.res.status(200).contentType("json").send(jsonData);
    } else {
      return this.res.sendStatus(200);
    }
  }

  protected csv(data: string) {
    this.res.setHeader("Content-Disposition", "attachment;filename=myfilename.csv");
    return this.res.status(200).contentType("text/csv").send(data);
  }

  protected created() {
    return this.res.sendStatus(201);
  }

  protected badRequest(message?: string) {
    return this.jsonResponse(400, message ? message : "Bad Request");
  }

  protected unauthorized(message?: string) {
    return this.jsonResponse(401, message ? message : "Unauthorized");
  }

  protected paymentRequired(message?: string) {
    return this.jsonResponse(402, message ? message : "Payment required");
  }

  protected forbidden(message?: string) {
    return this.jsonResponse(403, message ? message : "Forbidden");
  }

  protected notFound(message?: string) {
    return this.jsonResponse(404, message ? message : "Not found");
  }

  protected conflict(message?: string) {
    return this.jsonResponse(409, message ? message : "Conflict");
  }

  protected tooMany(message?: string) {
    return this.jsonResponse(429, message ? message : "Too many requests");
  }

  protected error(error: Error | string) {
    return this.res.status(500).json({
      message: error.toString(),
      stackTrace: new Error().stack,
    });
  }
}
