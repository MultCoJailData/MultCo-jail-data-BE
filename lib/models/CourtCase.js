const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  bail: Number,
  status: String
});

const schema = new mongoose.Schema({
  caseNumber: Number,
  bookingNumber: {
    type: String,
    ref: 'BookingState',
    required: true
  },
  charges: [chargeSchema]
});

schema.virtual('detention', {
  ref: 'Detention',
  localField: '_id',
  foreignField: 'currentCaseState'
});

module.exports = mongoose.model('CourtCase', schema);
