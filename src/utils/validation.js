// validation.js

const Joi = require("joi");
const { SystemConfigurationsKey } = require("./common");

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

const createRefDataSchema = Joi.object({
  value: Joi.string().required(),
  dataValue: Joi.string().required(),
  refCategory: Joi.string().required(),
});

const createNotesCategoriesSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const createNotesTypesSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const allowedKeys = Object.keys(SystemConfigurationsKey);

const createSystemConfigurationSchema = Joi.array().items(
  Joi.object({
    dataKey: Joi.string()
      .valid(...allowedKeys)
      .required(),
    dataValue: Joi.string().required(),
  })
);

const createOrUpdateUserProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.date().max(new Date()),
  email: Joi.string().email().required(),
  genderId: Joi.number().required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^[6-9]\d{9}$/))
    .required(),
  profilePicture: Joi.object({
    buffer: Joi.binary().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif")
      .required(),
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    size: Joi.number(),
  }),
  address1: Joi.string().required(),
  address2: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  countryId: Joi.number().required(),
  zipCode: Joi.string().required(),
  university: Joi.string(),
  college: Joi.string(),
});

module.exports = {
  signUpSchema,
  loginSchema,
  otpVerifySchema,
  forgotPasswordSchema,
  changePasswordSchema,
  createCountrySchema,
  createRefDataSchema,
  createNotesCategoriesSchema,
  createNotesTypesSchema,
  createSystemConfigurationSchema,
  createOrUpdateUserProfileSchema,
};
