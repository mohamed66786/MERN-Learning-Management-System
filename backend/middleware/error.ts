import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //  wrong mongodb id Error
  if (err.name == "CastError") {
    const message = `Resorce Not Found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // dublicate key error
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValues)} entered`;
    err = new ErrorHandler(message, 400);
  }
  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `json web token is not a valid`;
    err = new ErrorHandler(message, 400);
  }
  //jwt expired error
  if (err.name === "JsonWebTokenError") {
    const message = `json web token is expired`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
