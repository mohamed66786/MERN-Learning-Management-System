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
      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} is already exists!`, 400));
      }
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
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.create({ type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.create({ type: "FAQ", categories: categoriesItems });
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

// edit layout
export const editLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (type === "Banner") {
        const bannerData: any = await layoutModel.findOne({ type: "Banner" });
        const { image, title, subTitle } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }
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
        await layoutModel.findByIdAndUpdate(bannerData._id, { banner });
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const FaqItem = await layoutModel.findOne({ type: "FAQ" });
        ({ type: "FAQ" });
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(FaqItem?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const CatagoriesData = await layoutModel.findOne({
          type: "Categories",
        });
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await layoutModel.findByIdAndUpdate(CatagoriesData?._id, {
          type: "FAQ",
          categories: categoriesItems,
        });
      } else {
        return next(new ErrorHandler("Please Add the type!!!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Layout Updated succefully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get layout by type
export const getLayoutByType = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const layout = layoutModel.findOne(type);
      res.status(201).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
