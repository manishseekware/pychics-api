const moment = require('moment-timezone');
const {Schedule , Wallet, User } = require('../models');
const helper = require('../utlis/helper');


const totalCalulatiion = async(scheduleBody) =>{
   const clientwallet = await Wallet.findOne({user: scheduleBody.client});
  const professionalWallet = await Wallet.findOne({user: scheduleBody.professional});
  const professional = await User.findOne({_id: scheduleBody.professional});
  console.log(professional)
  const totalamout = parseInt(professional.actual_rate) * parseInt(scheduleBody.duration)
  console.log(totalamout)
  if(totalamout>clientwallet.balence){
    return {
      status: 0,
      message: "Low Balence in Client Wallet Add Money"
    }
  }
  professionalWallet.balence = parseInt(totalamout) + parseInt(professionalWallet.balence)
  clientwallet.balence = parseInt(clientwallet.balence) - parseInt(totalamout);
  professionalWallet.save();
  clientwallet.save()
  return {
    status: 1
  }
}

const checkisBooked = async(startTime, endTime) => {
    const bookedSlots = await Schedule.find({
      $or: [
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
      ]
    })
 for (const slot of bookedSlots) {
    // Check if the provided time range overlaps with any booked slot
    if (
      (startTime >= slot.startTime && startTime < slot.endTime) ||
      (endTime > slot.startTime && endTime <= slot.endTime) ||
      (startTime <= slot.startTime && endTime >= slot.endTime)
    ) {
      return true; // Time slot is booked
    }
  }

  return false; // Time slot is available
};





// Function to find available time slots
const findAvailableTimeSlot = async (startTime, endTime, timezone) => {
 const duration = 30; // Duration in minutes
  console.log(startTime, endTime)
    const startHour = 10; // 10 AM
  const endHour = 21; // 9 PM

  // Convert the start and end dates to moment objects in the specified time zone
  const startMoment = moment.unix(startTime).tz(timezone).set({ hour: startHour, minute: 0, second: 0 });
  const endMoment = moment.unix(endTime).tz(timezone).set({ hour: endHour, minute: 0, second: 0 });
  
  console.log(startMoment, endMoment)

  // Calculate the difference in minutes between the start and end times
  const diffMinutes = endMoment.diff(startMoment, 'minutes');

  // Check if the duration is less than the time range
  if (diffMinutes < duration) {
    console.log(duration, diffMinutes)
    return []; 
  }

  const timeSlots = [];

  // Round up the start time to the nearest 30-minute interval
  let roundedStartTime = Math.ceil(startMoment.minute() / duration) * duration;
  let calculatedStartTime = startMoment.startOf('hour').add(roundedStartTime, 'minutes');

  while (calculatedStartTime.isSameOrBefore(endMoment)) {
    // Calculate the end time by adding the duration
    const calculatedEndTime = calculatedStartTime.clone().add(duration, 'minutes');
    console.log(calculatedEndTime)

    // Convert start and end time to Unix timestamps
    const startTimeUnix = calculatedStartTime.unix();
    const endTimeUnix =  calculatedEndTime.unix();
      const isBooked = checkisBooked(startTimeUnix, endTimeUnix);

    // Add the time slot to the array only if it is available
    if (!isBooked) {
      timeSlots.push({ startTimeUnix, endTimeUnix });
    }



    // Add the time slot to the array
  //  timeSlots.push({ startTimeUnix, endTimeUnix });
    
    // Move to the next time slot by adding the duration
    calculatedStartTime.add(duration, 'minutes');
  }

  // Return the array of time slots in Unix time format
  const slots =  timeSlots.sort((slot1, slot2) => slot1.startTimeUnix - slot2.startTimeUnix);
  console.log(slots)

  return slots;
}
// Example usage
// const timezone = 'America/New_York'; // Replace with the desired time zone
// const startTime = '2023-05-30T10:00:00'; // Replace with the actual start time
// const endTime = '2023-05-30T16:00:00'; // Replace with the actual end time

//const timeSlot = findAvailableTimeSlot(startTime, endTime, timezone);

// if (timeSlot) {
//   console.log('Start Time (Unix):', timeSlot.startTimeUnix);
//   console.log('End Time (Unix):', timeSlot.endTimeUnix);
// } else {
//   console.log('No available time slot within the specified range.');
// }



const createSchedule = async (scheduleBody) => {
  const slots = await  findAvailableTimeSlot(scheduleBody.start_time, scheduleBody.end_time, "Asia/Kolkata")
  if(slots.length ===0){
    return {
      message: "No available time slot within the specified range"
    }
  }
  console.log(checkSlots)
  if(checkSlots.length >0){
    return {
      message: "No Slots are Aviable for this Time"
    }
  }
  const amount = await totalCalulatiion(scheduleBody)
 //const slots = await  findAvailableTimeSlot(scheduleBody.start_time, scheduleBody.end_time, "Asia/Kolkata")
  if(amount.status === 0){
    return amount.message
  }
 return Schedule.create(scheduleBody);
};


const getAppointmentDetails = async (id) => {
  console.log(id)
  const appointments = await Schedule.find({ client: id })
    .sort({ start_date: 'desc', start_time: 'desc' })
    .populate('professional', { first_name: 1, last_name: 1, topics: 1 });
    console.log(appointments)
  return appointments;
};

const getSlots = async(body) => {
    const checkSlots = await Schedule.find({start_time: body.startDate})
    if(checkSlots.length> 0){
      return {
          message: "No Slots are Aviable for this Time"
      }
    }else{
  const slots =  await findAvailableTimeSlot(body.startDate, body.endDate, body.timezone);
  return {
    message: "Slots are Aviable for this Time",
    slots: slots
  }
    }
}

module.exports = {
    createSchedule,
    getAppointmentDetails,
    getSlots
}