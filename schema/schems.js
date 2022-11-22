const Joi = require('joi');

const schemaPutContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().min(3).max(30),
});

const schemaPostContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

const schemaPatchContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaUserSignupAndLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(5).max(30).required(),
  subscription: Joi.string().required(),
});

module.exports = {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
  schemaUserSignupAndLogin,
};
