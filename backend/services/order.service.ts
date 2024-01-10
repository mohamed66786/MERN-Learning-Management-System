import {  NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/orderModel";


// create new order
export const newOrder = catchAsyncError(
    async (data:any, res:Response,next: NextFunction) => {
       const order=await OrderModel.create(data);
       res.status(200).json({
         success: true,
         order,
       });
    })