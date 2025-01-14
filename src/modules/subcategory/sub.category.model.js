const { Schema, Types, model } = require("mongoose");

const SubCategorySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  items: {type: [Object], required: false, default: []},
});

const SubCategoryModel = model("SubCategory", SubCategorySchema);
module.exports = SubCategoryModel;
