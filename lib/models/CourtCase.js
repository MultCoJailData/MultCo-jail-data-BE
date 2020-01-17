const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  bail: Number,
  status: String
});

const schema = new mongoose.Schema({
  caseNumber: String,
  charges: [chargeSchema]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('detention', {
  ref: 'Detention',
  localField: '_id',
  foreignField: 'currentCaseState'
});

module.exports = mongoose.model('CourtCase', schema);
