const Joi = require('joi');
const {auth_validater} = require('../validater/auth.validter')


const validater = (schema) => {
  return async(req, res, next) => {
   const { error } = schema.validate(req.body) 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',')
      console.log("error", message); 
      res.status(422).json({ error: message }) 
    } 
  }
};


module.exports = validater