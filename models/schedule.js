const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
    professional: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
    meeting_type: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    start_date: {
      type: Number,
    },
    end_date: {
      type: Number,
    },

    start_time: {
      type: Number,
    },
    end_time: {
      type: Number,
    },
    schedule_type: {
      type: String,
    },
    duration: {
      type: Number,
    },
    // user : {
    //   type: mongoose.SchemaTypes.ObjectId ,
    //   ref :"User"
    // }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// scheduleSchema.plugin(toJSON);
// scheduleSchema.plugin(paginate);

/**
 * @typedef Notification
 */
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
