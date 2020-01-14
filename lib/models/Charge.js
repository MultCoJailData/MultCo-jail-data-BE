const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    ref: 'Booking',
    required: true
  },
  description: String,
  bail: String,
  status: String
});

module.exports = mongoose.model('Charge', schema);
