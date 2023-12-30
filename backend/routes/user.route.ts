import express from "express";
import { registerUser } from "../controllers/userController";
const userRouter = express.Router();


userRouter.post("/registration",registerUser)

export default userRouter;