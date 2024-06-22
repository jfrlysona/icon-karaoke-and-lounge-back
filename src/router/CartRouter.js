const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCart,
} = require("../controller/CartController");
const verifyAccess = require("../middleware/AuthMiddleware");
const CartRouter = express.Router();

CartRouter.post("/cart/add", verifyAccess(["Admin","User"]), addItemToCart);
CartRouter.post("/cart/remove", verifyAccess(["Admin","User"]), removeItemFromCart);
CartRouter.get("/cart/:userId", verifyAccess(["Admin","User"]), getCart);

module.exports = CartRouter;
