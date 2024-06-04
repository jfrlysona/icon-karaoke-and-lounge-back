const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema({
  name: { type: String, unique: true },
  items: [{ type: Schema.Types.ObjectId, ref: "items" }],
});

const CategoriesModel = mongoose.model("categories", categoriesSchema);
module.exports = CategoriesModel;
