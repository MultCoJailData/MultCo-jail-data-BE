const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  bail: String,
  status: String
});

const caseSchema = new mongoose.Schema({
  courtCaseNumber: String,
  daCaseNumber: String,
  citationNumber: String,
  charges: [chargeSchema]
});

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
  },
  swisId: {
    type: String,
    required: true,
  },
  dateAdded : { 
    type : Date, 
    default: Date.now 
  },
  fullName: String,
  age: String,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String,
  arrestingAgency: String,
  bookingDate: String,
  assignedFacility: String,
  projectedReleaseDate: String,
  cases: [caseSchema]
});

module.exports = mongoose.model('Booking', schema);
