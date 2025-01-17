const { Schema, model } = require("mongoose");
const Category = require("../models/category-model");

const slugify = require("slugify");

const SubcategorySchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [false, "category is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    subsubcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subsubcategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

SubcategorySchema.post("save", async function () {
  await Category.findByIdAndUpdate(this.category, {
    $addToSet: { subcategories: this._id },
  });
});

SubcategorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = model("Subcategory", SubcategorySchema);
