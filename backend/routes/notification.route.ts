import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getNotification, updateNotification } from "../controllers/notification.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRole("admin"),
  getNotification
);
notificationRoute.put(
  "/update-notification/:id",
  isAuthenticated,
  updateNotification
);

export default notificationRoute;
