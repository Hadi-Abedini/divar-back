const Joi = require('joi');

const addUserValidationSchema = Joi.object({
	// name: Joi.string().required().trim(),
	phone: Joi.string().required().trim(),
	role: Joi.string().valid('ADMIN', 'USER').uppercase().trim()
});

const editUserValidationSchema = Joi.object({
	phone: Joi.string().trim(),
});

module.exports = { addUserValidationSchema, editUserValidationSchema };
