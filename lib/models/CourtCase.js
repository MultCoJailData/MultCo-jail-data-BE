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

schema.statics.findOneOrCreate = function(scrapeObject) {
  if(!scrapeObject.case) return Promise.resolve();

  return this
    .findOne({ caseNumber: scrapeObject.case.caseNumber })
    .then(courtCase => {
      if(!courtCase) return this.create(scrapeObject.case);
      return courtCase
    });
}

module.exports = mongoose.model('CourtCase', schema);
