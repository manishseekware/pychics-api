const {user_services } = require('../services/index')


const getClientDashboardData =  async(req,res) => {
    try{
    const appoimentdata = await user_services.getClientDashboardData(req.params.userId)
    res.status(200).json({
        message: "Dashboard data",
        result: appoimentdata
    })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}



module.exports ={
    getClientDashboardData
}