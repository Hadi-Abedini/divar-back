const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category is required"],
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "subcategory is required"],
    },
    subsubcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subsubcategory",
      required: [true, "subsubcategory is required"],
    },
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "products-thumbnails-default.jpeg",
    },
    images: {
      type: [String],
      trim: true,
      default: ["products-images-default.jpeg"],
    },
    provider: { type: String, required: false },
    city: { type: String, required: false },
    district: { type: String, required: false },
    address: { type: String, required: false },
    coordinate: { type: [Number], required: false },
  },
  {
    timestamps: true,
  }
);

// create slug for product.title
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = model("Product", ProductSchema);
