require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";

// body Parser
app.use(express.json({ limit: "50mb" }));
// cookie parser
app.use(cookieParser());
// using cors =>cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// test api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "api test successful" });
});

// for unknown routes
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found}`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);