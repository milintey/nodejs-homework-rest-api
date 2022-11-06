const Joi = require('joi');

const schemaPutContact = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string()
      .min(3)
      .max(30)
});
  
const schemaPostContact = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string()
      .min(3)
      .max(30)
      .required()
});
  
module.exports = {
    schemaPostContact,
    schemaPutContact
}