const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCart,
} = require("../controller/CartController");
const CartRouter = express.Router();

CartRouter.post("/cart/add", addItemToCart);
CartRouter.post("/cart/remove", removeItemFromCart);
CartRouter.get("/cart/:userId", getCart);

module.exports = CartRouter;
