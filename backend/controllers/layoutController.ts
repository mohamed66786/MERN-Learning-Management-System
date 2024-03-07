import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import layoutModel from "../models/layoutModel";

// create the layout
export const createLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await layoutModel.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        await layoutModel.create(faq);
      }
      if (type === "Categories") {
        const { categories } = req.body;
        await layoutModel.create(categories);
      }
      res.status(201).json({
        success: true,
        message: "Layout created succefully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
