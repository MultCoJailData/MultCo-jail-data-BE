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
      ref: 'BookingState'
    }
  ],
  caseStates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourtCase'
    }
  ],
  currentBookingState:     {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingState'
  },
  currentCaseState:     {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourtCase'
  }
});

schema.statics.countByAgency = function(){

  return this.aggregate([

    { '$group' : { _id:'$arrestingAgency', count:{ $sum:1 } } }

  ]
  );
};

schema.statics.countByTime = function(){

  return this.aggregate([

    { '$group' : {
      '_id': { $hour: '$bookingDate' }, count:{ $sum:1 } } }

  ]
  );
};

module.exports = mongoose.model('Detention', schema);
