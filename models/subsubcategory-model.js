const { Schema, model } = require('mongoose');
const slugify = require('slugify');
const Subcategory = require("../models/subcategory-model");

const SubsubcategorySchema = new Schema(
	{
		subcategory: {
			type: Schema.Types.ObjectId,
			ref: 'Subcategory',
			required: [true, 'subcategory is required']
		},
		title: {
			type: String,
			required: [true, 'title is required'],
			trim: true
		},
		slug: {
			type: String,
			trim: true
		}
	},
	{
		timestamps: true
	}
);

SubsubcategorySchema.post("save", async function () {
	
	await Subcategory.findByIdAndUpdate(this.subcategory, {
	  $addToSet: { subsubcategories: this._id },
	});
  });

SubsubcategorySchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });

	next();
});

module.exports = model('Subsubcategory', SubsubcategorySchema);
