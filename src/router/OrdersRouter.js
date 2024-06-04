const express = require("express");
const {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} = require("../controller/OrdersController.js");
const { verifyAccess } = require("../middleware/AuthMiddleware.js");

const OrdersRouter = express.Router();

OrdersRouter.get("/orders", getAllOrders);
OrdersRouter.get("/orders/:id", getOrderById);
OrdersRouter.post("/orders", createOrder);
OrdersRouter.delete("/orders/:id", deleteOrder);

module.exports = { OrdersRouter };

// OrdersRouter.get("/orders", verifyAccess(["Admin"]), getAllOrders);
// OrdersRouter.get("/orders/:id", verifyAccess(["Admin"]), getOrderById);
// OrdersRouter.post("/orders",  verifyAccess(["Admin", "User"]),createOrder);
// OrdersRouter.delete("/orders/:id", verifyAccess(["Admin", "User"]), deleteOrder);
