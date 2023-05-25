const mongoose = require('mongoose');


const schduleSchema  = mongoose.Schema({
    client: {
        type: String,
        required: true,
        ref: "User",
    },
    professnial : {
        type: String,
        required: true,
        ref: "User"
    }, 
    start_date: {
        type: Number,
        required: true
    },
    start_time: {
        type: Number,
        required: true
    }, 
    end_date: {
        type: Number,
        required: true
    }, 
    end_time: {
        type: Number,
        required: true
    }, 
    duration : {
        type: Number,
        required: true
    },
    meet_type: {
        type: Number,
        required:true
    }, 
    is_paid: {
        type: Boolean,
        default: false
    }

})


module.exports = mongoose.model('Schedule', schduleSchema);
