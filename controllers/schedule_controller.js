const {schedule_services} = require('../services/index')


const cerateSchedule = async(req,res) => {
    try{
    const schedule = await schedule_services.CreateSchedule(req.body)
    res.status(200).json({
        message: "Schedule successfully"
    })
    }catch(error){
        console.log(error);
        res.status(400).json({
            mesage: error.message
        })
    }
}



module.exports = {
    cerateSchedule
}