const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema(
  {
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    promocode: [
      {
        code: { type: String, required: true },
        discount: { type: Number, required: true },
        expirationDate: { type: Date, required: true },
        limit: { type: Number, default: 0, ref: "users" },
      },
    ],
    paymentMethod: { type: String, required: true },
    items: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "items" },
        itemCount: { type: Number, required: true },
      },
    ],
    orderByUserId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const OrdersModel = mongoose.model("orders", ordersSchema);
module.exports = OrdersModel;
