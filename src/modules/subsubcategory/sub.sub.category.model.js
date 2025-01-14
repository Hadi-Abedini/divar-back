const { Schema, Types, model } = require("mongoose");

const SubSubCategorySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, index: true },
  sub_category: { type: String, required: true, index: true },
});

const SubCategoryModel = model("SubSubCategory", SubSubCategorySchema);
module.exports = SubCategoryModel;
