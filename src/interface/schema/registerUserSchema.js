const Joi = require('joi');

const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = registerUserSchema;
