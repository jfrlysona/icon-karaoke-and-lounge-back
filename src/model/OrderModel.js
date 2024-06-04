const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  cashback: { type: Number, default: 0, ref: "users" },
  note: String,
  items: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: "items" },
      itemCount: { type: Number, required: true },
    },
  ],
  orderByUserId: { type: Schema.Types.ObjectId, ref: "users" },
});

const OrdersModel = mongoose.model("orders", ordersSchema);
module.exports = OrdersModel;
