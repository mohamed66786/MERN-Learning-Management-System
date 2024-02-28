import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/orderController";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.post(
  "/get-orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrders
);

export default orderRouter;
