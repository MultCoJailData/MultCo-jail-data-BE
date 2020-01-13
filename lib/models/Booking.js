const mongoose = require('mongoose');
const Detention = require('./Detention');

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
    unique: true
  },
  swisId: {
    type: String,
    required: true
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

schema.post('save', async function(doc) {
  let detention = await Detention.findOne({ 
    bookingNumber: doc.bookingNumber });
  if(!detention){
    detention = await Detention.create({
      bookingNumber: doc.bookingNumber,
      bookingDate: doc.bookingDate,
    });
  } 
  detention.states.push(doc);
  detention.save();
});

module.exports = mongoose.model('Booking', schema);
