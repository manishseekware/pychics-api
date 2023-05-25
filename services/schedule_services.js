const moment = require('moment');
const {Schedule } = require('../models');
const Epoctime = require('../utlis/helper')










const CreateSchedule = async(schedueBody) => {
    // ++++++++++++++++++++++++++++timeSlot+++++++++++++++++++++++++++++=
// Specify the start and end times for the booking period
const startTime =Epoctime.EpochToUnix(schedueBody.start_time)  // Use your desired start time here
const endTime = Epoctime.EpochToUnix(schedueBody.end_time); // Use your desired end time here
console.log(`**************************************start_time: ${startTime}`);
console.log(`**************************************end_time: ${endTime}`);
const timeZone = 'America/New_York'; // Replace with the desired US time zone
const targetDate = endTime; // Replace with the specific date you want to check
// Example of booked time slots for the target date
const bookedSlots = [
  { start: '2023-06-25 09:30:00', end: '2023-06-25 10:00:00' },
  { start: '2023-06-25 11:00:00', end: '2023-06-25 11:30:00' },
  { start: '2023-06-25 13:30:00', end: '2023-06-25 14:00:00' },
];

const interval = 30; // Time slot interval in minutes

const availableSlots = [];

let currentTime = startTime

while (currentTime < endTime) {
  const endSlot = currentTime.clone().add(interval, 'minutes');
  const isBooked = bookedSlots.some(slot => {
  const slotStart = moment(slot.start, 'YYYY-MM-DD HH:mm:ss');
  const slotEnd = moment(slot.end, 'YYYY-MM-DD HH:mm:ss');
    return currentTime.isBetween(slotStart, slotEnd, null, '[)');
  });

  if (!isBooked) {
    availableSlots.push({
      start: currentTime.format('YYYY-MM-DD HH:mm:ss'),
      end: endSlot.format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  currentTime.add(interval, 'minutes');
}

console.log(availableSlots);










// Initialize an array to store the booked slots
// const bookedSlots = [];

// // Initialize an array to store the remaining slots
// const remainingSlots = [];

// // Set the current time as the starting point for iteration
// let currentTime = new Date(startTime);

// // Iterate over the time slots in 30-minute intervals until the end time
// while (currentTime < endTime) {
//   bookedSlots.push(new Date(currentTime));
//   currentTime.setMinutes(currentTime.getMinutes() + 30);
// }

// // Fill the remaining slots array with the unused time slots
// for (let i = 0; i < bookedSlots.length - 1; i++) {
//   const currentSlotEnd = bookedSlots[i + 1];
//   const nextSlotStart = new Date(bookedSlots[i]);
  
//   // Calculate the duration between slots
//   const duration = (currentSlotEnd - nextSlotStart) / (1000 * 60); // Convert milliseconds to minutes
//   if (duration > 30) {
//     const remainingSlotStart = new Date(nextSlotStart);
//     remainingSlotStart.setMinutes(remainingSlotStart.getMinutes() + 30);
//     remainingSlots.push({
//       start: remainingSlotStart,
//       end: currentSlotEnd
//     });
//   }
// }

// console.log(bookedSlots)

// // Print the booked slots
// console.log('Booked Slots:');
// bookedSlots.forEach(slot => console.log(slot));

// // Print the remaining slots
// console.log('Remaining Slots:');
// remainingSlots.forEach(slot => console.log(slot));




}


module.exports = {
    CreateSchedule
}