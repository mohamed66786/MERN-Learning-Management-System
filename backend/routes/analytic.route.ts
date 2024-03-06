import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrderAnalytics,
  getUsersAnalytics,
} from "../controllers/analyticController";
const analyticRouter = express.Router();

analyticRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getUsersAnalytics
);
analyticRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getOrderAnalytics
);
analyticRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getCoursesAnalytics
);
export default analyticRouter;
