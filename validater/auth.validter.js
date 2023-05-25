const Joi= require('joi');



const clientRegister  = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    countryCode: Joi.string().optional(),
    phone: Joi.number().optional(),
    pincode: Joi.string().optional(),
    gender: Joi.string().optional(),
    issues: Joi.string().optional(),
    other_issues: Joi.string().optional(),
    dob: Joi.date().required(),
    ref_site: Joi.string().optional(),
    find_us: Joi.string().optional(),
    refId: Joi.string().optional(),
  }),
};

module.exports = {
    clientRegister
}