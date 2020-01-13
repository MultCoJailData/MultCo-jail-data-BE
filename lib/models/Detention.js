const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    ref: 'Booking',
    required: true,
  },
  bookingDate: {
    type: Date,
    immutable: true,
    required: true
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
