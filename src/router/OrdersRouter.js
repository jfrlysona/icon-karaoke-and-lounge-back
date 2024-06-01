import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "../controller/OrdersController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";

export const OrdersRouter = express.Router();

OrdersRouter.get("/orders", getAllOrders);
OrdersRouter.get("/orders/:id", getOrderById);
OrdersRouter.post("/orders", createOrder);
OrdersRouter.delete("/orders/:id", deleteOrder);

// OrdersRouter.get("/orders", verifyAccess(["Admin"]), getAllOrders);
// OrdersRouter.get("/orders/:id", verifyAccess(["Admin"]), getOrderById);
// OrdersRouter.post("/orders",  verifyAccess(["Admin", "User"]),createOrder);
// OrdersRouter.delete("/orders/:id", verifyAccess(["Admin", "User"]), deleteOrder);
