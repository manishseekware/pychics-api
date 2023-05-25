
const EpochToUnix = (time) => {
const epochTime = time; // Replace with your desired epoch time

// Create a new Date object using the epoch time in milliseconds
const date = new Date(epochTime * 1000);

// Extract the date components
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

// Extract the time components
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');

// Create the formatted date string
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

console.log(formattedDate); // Output: 2023-05-26 09:00
return formattedDate

}

// Convert Epoh time to ormal ISO 
// Specify the epoch time


module.exports =  {
    EpochToUnix
}