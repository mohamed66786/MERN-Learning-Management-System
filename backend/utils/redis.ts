import { Redis } from "ioredis";
require("dotenv").config();

// this function to check first if there is redis connection for avoiding errors
const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis Connected ");
    return process.env.REDIS_URL;
  }
  throw new Error("Redis Connection Failed");
};

export const redis = new Redis(redisClient());
