const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
      default: "categories-icons-default.png",
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

module.exports = model("Category", CategorySchema);
