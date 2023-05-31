const Joi = require('joi');
const {auth_validater} = require('../validater/auth.validter')


const validater = (schema) => {
  return async(req, res, next) => {
     try {
     await   schema.
      next();
    } catch (error) {
      // Validation failed, return an error response
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
};


module.exports = validater