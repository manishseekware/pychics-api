const { duration } = require('moment')
const {User, Wallet, Schedule} =  require('../models/index')
const helper = require('../utlis/helper')






const getClientDashboardData = async(userId) => {
    const ScheduleData = await Schedule.find({client: userId}).populate('client')
    const walletData = await Wallet.findOne({user: userId})
    console.log(walletData)
    const data = {
         total_appointment: ScheduleData.length,
         total_referal : 5,
         membership_type: 'Gold',
          wallet_amount: walletData.balence,
           next_appointment_detail: {
            date:  helper.EpochToUnix(ScheduleData[0].start_date).split(' ')[0],
            time: (helper.EpochToUnix(ScheduleData[0].start_time)).split(' ')[1],
            duration: 30
           }
    }
    return data
}




module.exports = {
    getClientDashboardData
}