const Joi = require("joi");

// thumbnail: Joi.string().required().trim(),
// TODO: add array maxSize: 10
// images: Joi.array().items(Joi.string().trim()),

const addProductValidationSchema = Joi.object({
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  subsubcategory: Joi.string().required(),
  title: Joi.string().required().trim(),
  price: Joi.number(),
  description: Joi.string().required().trim(),
});

const editProductValidationSchema = Joi.object({
  category: Joi.string(),
  subcategory: Joi.string(),
  subsubcategory: Joi.string(),
  title: Joi.string().trim(),
  price: Joi.number(),
  description: Joi.string().trim(),
});

module.exports = {
  addProductValidationSchema,
  editProductValidationSchema,
};
