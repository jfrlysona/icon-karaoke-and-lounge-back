import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrdersWithUserInfo,
} from "../controller/OrdersController.js";

export const OrdersRouter = express.Router();

OrdersRouter.post("/orders", createOrder);
OrdersRouter.delete("/orders/:id", deleteOrder);
OrdersRouter.get("/orders", getAllOrdersWithUserInfo);
