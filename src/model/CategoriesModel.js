import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema({
  name: { type: String, unique: true },
  items: [{ type: Schema.Types.ObjectId, ref: "items" }],
});

export const CategoriesModel = mongoose.model("categories", categoriesSchema);
