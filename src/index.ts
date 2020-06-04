import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import winston from "winston";
import mongoose from "mongoose";
import expressWinston from "express-winston";

import logger from "./api/utils/logger";
import dataStoreApi from "./api/v1/datastore";

const app = express();

const mongoUri = "mongodb+srv://admin:admin@cluster0-zsfkk.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  winston.info("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  winston.info("Error connecting to mongo", err);
});

// request logging middleware
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: logger.format,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
);

// Initialise stuff
logger.initialise();

app.use(bodyParser.json());

app.use("/api/v1/datastore", dataStoreApi);

// catch-all error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // if (err.name === "UnauthorizedError") {
  //   res.status(401).send("Invalid token");
  //   return;
  // }

  winston.error(`unhandled error: ${err.message}`);
  res.status(500).end();
});

const server = app.listen(3000, () => {
  winston.info("Listening on port 3000");
});

process.on("SIGINT", () => {
  server.close();
  mongoose.disconnect();
  winston.info("SIGINT signal received");
});
