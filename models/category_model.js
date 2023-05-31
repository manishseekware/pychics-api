const mongoose = require('mongoose');


const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Category', categorySchema);
