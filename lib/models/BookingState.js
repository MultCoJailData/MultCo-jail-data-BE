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
  caseNo: String,
});

module.exports = mongoose.model('Booking', schema);
