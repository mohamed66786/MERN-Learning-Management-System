import {  NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/orderModel";


// create new order
export const newOrder = catchAsyncError(
    async (data:any, next: NextFunction) => {
       const order=await OrderModel.create(data);
       next(order);
    })