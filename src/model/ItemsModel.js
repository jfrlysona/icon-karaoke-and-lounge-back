import mongoose, { Schema } from "mongoose";

const itemsSchema = new Schema({
  name: { type: String, unique: true ,ref: "orders"},
  price: { type: Number, ref: "orders" },
  image: String,
  ingredients: [{ type: String }],
  categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
});

export const ItemsModel = mongoose.model("items", itemsSchema);
