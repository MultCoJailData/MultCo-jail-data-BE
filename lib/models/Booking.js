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
    required: true
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
  bookingDate: Date,
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
  await detention.populate('states').execPopulate();
  const detentionObj = detention.toObject();
  const docObj = doc.toObject();
  let lastObj;
  if(detentionObj.states.length > 0) {
    lastObj = detentionObj.states[detentionObj.states.length - 1];
  }
  delete docObj._id; 
  delete docObj.dateAdded;
  if(lastObj) {
    delete lastObj._id;
    delete lastObj.dateAdded;
  }
  if(!(JSON.stringify(docObj) === JSON.stringify(lastObj))) {
    detention.states.push(doc._id);
  }
  detention.save();
  return true;
});

module.exports = mongoose.model('Booking', schema);
