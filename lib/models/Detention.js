const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
  },
  releaseDate: Date,
  states: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Booking'
    }
  ]
});

module.exports = mongoose.model('Detention', schema);
