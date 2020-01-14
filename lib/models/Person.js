const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  swisId: {
    type: String,
    required: true
  },
  bookingNumber: {
    type: String,
    ref: 'Booking',
    required: true
  },
  fullName: String,
  age: String,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String
});

module.exports = mongoose.model('Person', schema);
