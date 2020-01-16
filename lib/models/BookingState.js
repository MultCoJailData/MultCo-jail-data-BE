const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  detentionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detention',
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
