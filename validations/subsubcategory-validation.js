const Joi = require("joi");

const addSubsubcategoryValidationSchema = Joi.object({
  subcategory: Joi.string().required(),
  title: Joi.string().required().trim(),
});

const editSubsubcategoryValidationSchema = Joi.object({
  subcategory: Joi.string(),
  title: Joi.string().trim(),
});

module.exports = {
  addSubsubcategoryValidationSchema,
  editSubsubcategoryValidationSchema,
};
