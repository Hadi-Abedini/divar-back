const Joi = require('joi');

const addSubcategoryValidationSchema = Joi.object({
	// category: Joi.string().trim(),
	// title: Joi.string().required().trim()
});

const editSubcategoryValidationSchema = Joi.object({
	category: Joi.string().trim(),
	title: Joi.string().trim()
});

module.exports = {
	addSubcategoryValidationSchema,
	editSubcategoryValidationSchema
};
