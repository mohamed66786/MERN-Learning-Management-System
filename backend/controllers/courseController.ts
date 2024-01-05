require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import courseModel from "../models/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";

// upload course
export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit course
export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        // first delete the existing couse
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        // then add the new course update
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;
      const course = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "Course edited successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single course-- without purchasing
export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      // Enhance this by checking if it exists in cache first
      const isCacheExists = await redis.get(courseId);
      if (isCacheExists) {
        const course = JSON.parse(isCacheExists);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(courseId)
          // that in Mongoose select method if variable start with + it selected
          //  if start with - it not selected
          .select(
            "-courseData.videoUrl -courseData.suggetions -courseData.questions -courseData.links"
          );
        // add it in redis chache
        await redis.set(courseId, JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all course-- without purchasing
export const getAllCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExists = await redis.get("allCourses");
      if (isCacheExists) {
        const course = JSON.parse(isCacheExists);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const courses = await courseModel
          .find()
          // that in Mongoose select method if variable start with + it selected
          //  if start with - it not selected
          .select(
            "-courseData.videoUrl -courseData.suggetions -courseData.questions -courseData.links"
          );
        await redis.set("allCourses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course content --- only for valid users
export const getCourseByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCoursesList = req.user?.courses;
      const courseId = req.params.id;
      const courseExists = userCoursesList?.find(
        (course: any) => course._id === courseId
      );
      if (!courseExists) {
        return next(
          new ErrorHandler("Your are not able to access this course!", 404)
        );
      }
      const course = await courseModel.findById(courseId);
      const content = course?.coursData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add questions to course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}
export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await courseModel.findById(courseId);
      // first check if the id that sent is valid or not
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content ID !", 400));
      }
      const courseContent = course?.coursData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Invalid content ID !", 400));
      }
      // create new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };
      // add this question to our course content
      courseContent.questions.push(newQuestion);
      // save the updated course
      await course?.save();
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string; // that answer to
}

export const addAnswer = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;
      const course = await courseModel.findById(courseId);
      // first check if the id that sent is valid or not
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content ID !", 400));
      }
      const courseContent = course?.coursData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Invalid content ID !", 400));
      }
      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler("Invalid content ID !", 400));
      }
      // create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer,
      };
      question.questionReplies?.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user._id) {
        // create anotification to admin
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );
        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      res.status(200).json({ success: true, course });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review in course
interface IAddReviewData {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}
export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCoureseList = req.user?.courses;
      const courseId = req.params.id;
      //if the course id exists in userCourseList based on _id
      const courseExists = userCoureseList?.some(
        (coures: any) => coures._id.toString() == courseId.toString()
      );
      if (!courseExists) {
        return next(
          new ErrorHandler("Your are not eligible to access this course!", 400)
        );
      }
      const course = await courseModel.findById(courseId);
      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        rating: rating,
        comment: review,
      };
      course?.reviews.push(reviewData);
      let avg = 0;
      course?.reviews.forEach((review: any) => {
        avg += review.rating;
      });
      if (course) {
        course.ratings = avg / course.reviews.length;
      }
      await course?.save();
      const notification = {
        title: "New Review Recieved",
        message: `${req.user?.name} has given a review on ${course?.name}`,
      };
      //create a notification
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add reply on review
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;
      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Courese Not Found!", 40));
      }
      const review = course?.reviews?.find(
        (rev: any) => rev.id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler("Review Not Found!", 40));
      }
      const replyData: any = {
        user: req.user,
        comment,
      };
      if (!review.commentReplies) {
        review.commentReplies = [];
      }
      review.commentReplies?.push(replyData);
      await course.save();
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
