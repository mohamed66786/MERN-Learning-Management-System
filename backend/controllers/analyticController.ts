require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MonthData } from "../utils/analytic.generator";
import userModel from "../models/userModel";
import courseModel from "../models/courseModel";
import OrderModel from "../models/orderModel";

// get user analytics -- only admin can access this
export const getUsersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthData(userModel);
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
    res.status(200).json({
      success: true,
      message: "Users Analytics",
    });
  }
);

// get courses analytics -- only admin can access this
export const getCoursesAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthData(courseModel);
      res.status(201).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
    res.status(200).json({
      success: true,
      message: "Users Analytics",
    });
  }
);

// get order analytics -- only admin can access this
export const getOrderAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await generateLast12MonthData(OrderModel);
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
    res.status(200).json({
      success: true,
      message: "Users Analytics",
    });
  }
);
