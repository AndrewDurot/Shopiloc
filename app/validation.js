const Joi = require('@hapi/joi');

const registerValidation = data =>{
    const schema = Joi.object({
        first_name: Joi.string().min(6).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
    });
    return schema.validate(data);
};

const loginValidation = data =>{
    const schema = Joi.object({
        //name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
    });
    return schema.validate(data);
};

//Store Model Validation
const storeValidation = data =>{
    const schema = Joi.object({
        //name: Joi.string().min(6).required(),
        store_name: Joi.string().min(2).required(),
        store_url: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string().allow(null, ''),
        phone_number: Joi.string().required(),
        city: Joi.string(),
        store_logo: Joi.string().allow(null, ''),
        postal_code: Joi.required(),
        status: Joi.string(),
        store_description: Joi.string().required()
    });
    return schema.validate(data);
};

//Record id Validation
const recordValidation = data => {
    const schema = Joi.object({
        _id: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.storeValidation = storeValidation;
module.exports.recordValidation = recordValidation;