const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  cartItems: [{
    item: { type: Schema.Types.ObjectId, ref: "items" },
    quantity: { type: Number, required: true, default: 1 }
  }],
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
