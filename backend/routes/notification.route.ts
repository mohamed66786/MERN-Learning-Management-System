import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getNotification } from "../controllers/notification.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRole("admin"),
  getNotification
);

export default notificationRoute;
