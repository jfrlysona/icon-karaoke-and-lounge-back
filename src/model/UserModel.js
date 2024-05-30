import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  fullname: { type: String, required: true },
  role: { type: String, default: "user" },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
});

export const UsersModel = mongoose.model("users", usersSchema);
