const {schedule_services} = require('../services/index')



const createSchedule =async (req, res) => {
  const schedule = await schedule_services.createSchedule(req.body);
  console.log(schedule)
  res.status(200).send(schedule);
};


const getAppointments = async (req, res) => {
  const appointments = await schedule_services.getAppointmentDetails(req.params.id);
  res.send(appointments);
};

const getAviableSlots = async(req, res) => {
    try{
    const slots = await schedule_services.getSlots(req.body)
    res.status(200).json({
        message: slots.message,
        slots :slots.slots
    })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createSchedule,
    getAppointments,
    getAviableSlots
}