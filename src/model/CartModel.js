const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "items" },
  cartItems: [{ type: Schema.Types.ObjectId, ref: "items" }],
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
