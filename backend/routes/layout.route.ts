import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layoutController";
const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);

layoutRouter.post(
  "/edit-layout",
  isAuthenticated,
  authorizeRole("admin"),
  editLayout
);
layoutRouter.get("/get-layout", isAuthenticated, getLayoutByType);

export default layoutRouter;
