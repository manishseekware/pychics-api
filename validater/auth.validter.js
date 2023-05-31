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

const professionalRegister  = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().optional(),
    role: Joi.string().optional(),
     address: Joi.string().optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    countryCode: Joi.string().optional(),
    phone: Joi.number().optional(),
    pincode: Joi.string().optional(),
    timezone: Joi.string().optional(),
    gender: Joi.string().optional(),
    issues: Joi.string().optional(),
    other_issues: Joi.string().optional(),
    topics : Joi.array().required(),
    specialities: Joi.array().required(),
    skills: Joi.array().required(),
    actual_reate: Joi.number().required(),
    tool: Joi.number().required(),
    dob: Joi.date().required(),
    ref_site: Joi.string().optional(),
    find_us: Joi.string().optional(),
    refId: Joi.string().optional(),
    bio: Joi.string().required(),
    abilities: Joi.string().required()
  })
}

module.exports = {
    clientRegister,
    professionalRegister
}