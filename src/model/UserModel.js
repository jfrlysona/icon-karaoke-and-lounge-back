const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  fullname: { type: String, required: true },
  role: { type: String, default: "User" },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
});

const UsersModel = mongoose.model("users", usersSchema);
module.exports = UsersModel;
