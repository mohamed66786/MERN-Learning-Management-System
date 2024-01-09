require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel, { IOrder } from "../models/orderModel";
import userModel from "../models/userModel";
import courseModel from "../models/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { newOrder } from "../services/order.service";

//create order
export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await userModel.findById(req.user?._id);
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purshase this course!", 400)
        );
      }
      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found!", 400));
      }
      const data: any = {
        courseId: course._id,
        userId: req.user?._id,
      };
      newOrder(data, res, next);
      const mailData = {
        order: {
          _id: course._id.slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
