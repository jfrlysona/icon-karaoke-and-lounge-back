import mongoose, { Schema } from "mongoose";

const itemsSchema = new Schema({
  name: { type: String, unique: true },
  price: Number,
  image: String,
  ingredients: [{ type: String }],
  categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
});

export const ItemsModel = mongoose.model("items", itemsSchema);
