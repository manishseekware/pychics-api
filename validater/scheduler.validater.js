const Joi = require('joi')

const schedule_validater =  {
      body: Joi.object().keys({
    client: Joi.string().required(),
    professional: Joi.string().required(),
    meeting_type: Joi.string().required(),
    status: Joi.string().required(),
    start_date: Joi.number().optional(),
    end_date: Joi.number().optional(),
    start_time: Joi.number().optional(),
    end_time: Joi.number().optional(),
    schedule_type: Joi.string().optional(),
    duration: Joi.number().optional(),
  }),
}


module.exports = {
    schedule_validater
}