const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true
  },
  releaseDate: Date,
  person: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Person'
  },
  arrestingAgency: String,
  bookingStates: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Booking'
    }
  ],
  caseStates: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Case'
    }
  ],
  currentBookingState:     {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking'
  },
  currentCaseState:     {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Case'
  }
});

module.exports = mongoose.model('Detention', schema);
