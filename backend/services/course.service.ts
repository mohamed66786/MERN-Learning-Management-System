import { Response } from "express";
import courseModel from "../models/courseModel";
import { catchAsyncError } from "../middleware/catchAsyncError";

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  }
);
