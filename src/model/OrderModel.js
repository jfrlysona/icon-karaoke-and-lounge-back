import mongoose, { Schema } from "mongoose";

const ordersSchema = new Schema({
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  cashback: { type: Number, default: 0, ref: "users" },
  count: { type: Number, required: true },
  note: String,
  itemsName: [{ type: String, ref: "items" }],
  itemsPrice: [{ type: Number, ref: "items" }],
  orderByUserId: { type: Schema.Types.ObjectId, ref: "users" },
});

export const OrdersModel = mongoose.model("orders", ordersSchema);
