const Joi = require('@hapi/joi')



const registerValid = data => {
    const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}

const loginValid = data => {
    const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}
module.exports.registerValid = registerValid
module.exports.loginValid = loginValid