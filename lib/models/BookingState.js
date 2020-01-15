const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true
  },
  dateAdded : { 
    type : Date, 
    default: Date.now 
  },
  assignedFacility: String,
  projectedReleaseDate: String,
  caseNumber: Number,
});

module.exports = mongoose.model('BookingState', schema);
