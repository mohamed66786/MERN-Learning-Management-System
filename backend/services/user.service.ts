// this to get user from database

// import { Response } from "express";
// import userModel from "../models/userModel";

// export const getUserById = async (id: string, res: Response) => {
//   const user = await userModel.findById(id);
//   res.status(200).json({
//     success: true,
//     user,
//   });
// };

// this to get user from cache redis #### that more effictive and more speed
import { Response } from "express";
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(200).json({
      success: true,
      user,
    });
  }
};
  