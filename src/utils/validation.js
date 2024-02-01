// validation.js

const Joi = require("joi");

const signUpSchema = Joi.object({
  firstName: Joi.string().alphanum().max(30).required(),
  lastName: Joi.string().alphanum().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]|;:,.<>?])(?=.*\d)(?!\s).{6,24}$/
      )
    )
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]|;:,.<>?])(?=.*\d)(?!\s).{6,24}$/
      )
    )
    .required(),
});

const otpVerifySchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const changePasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]|;:,.<>?])(?=.*\d)(?!\s).{6,24}$/
      )
    )
    .required(),
  newPassword: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]|;:,.<>?])(?=.*\d)(?!\s).{6,24}$/
      )
    )
    .required(),
});

const createCountrySchema = Joi.object({
  name: Joi.string().required(),
  countryCode: Joi.string().required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
  otpVerifySchema,
  forgotPasswordSchema,
  changePasswordSchema,
  createCountrySchema,
};
