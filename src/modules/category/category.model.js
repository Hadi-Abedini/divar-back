const { Schema, Types, model } = require("mongoose");

const SubCategorySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, index: true },
  items: {
    type: [Object],
    ref: "SubCategory",
    required: false,
    default: [],
  },
});

const SubCategoryModel = model("SubCategory", SubCategorySchema);
module.exports = SubCategoryModel;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: false, default: null },
  image: { type: String, required: false, default: null },
  items: {
    type: [Object],
    ref: "SubCategory",
    required: false,
    default: [],
  },
});

const CategoryModel = model("Category", CategorySchema);
module.exports = CategoryModel;
