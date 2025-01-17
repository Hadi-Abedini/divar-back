const Joi = require('joi');

// TODO: add icon validation into resize icon controller
const addCategoryValidationSchema = Joi.object({
	title: Joi.string().required().trim()
});

const editCategoryValidationSchema = Joi.object({
	title: Joi.string().trim()
});

module.exports = { addCategoryValidationSchema, editCategoryValidationSchema };
