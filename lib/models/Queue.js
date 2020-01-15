const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookingNumber: String,
  active: Date,
  attempts: Number
});

module.exports = mongoose.model('Queue', schema);
