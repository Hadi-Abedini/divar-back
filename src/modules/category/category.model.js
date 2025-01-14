const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: false, default: null },
  image: { type: String, required: false, default: null },
  slug: { type: String, required: true, index: true },
  items: {type: [Object], required: false, default: []}
});

const CategoryModel = model("Category", CategorySchema);
module.exports = CategoryModel;
