const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemsSchema = new Schema({
  name: { type: String, unique: true, ref: "orders" },
  price: { type: Number, ref: "orders" },
  image: String,
  ingredients: [{ type: String }],
  categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
});

const ItemsModel = mongoose.model("items", itemsSchema);
module.exports = ItemsModel;
