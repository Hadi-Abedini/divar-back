const Joi = require("joi");

const userOtpValidationSchema = Joi.object({
  phone: Joi.string().required().trim(),
});

const userSigninValidationSchema = Joi.object({
  phone: Joi.string().required(),
  code: Joi.string().required(),
});

module.exports = { userSigninValidationSchema, userOtpValidationSchema };
