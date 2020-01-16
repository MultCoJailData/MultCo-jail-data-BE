const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  swisId: {
    type: String,
    required: true
  },
  fullName: String,
  age: String,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String
});

schema.virtual('detention', {
  ref: 'Detention',
  localField: '_id',
  foreignField: 'person'
});

module.exports = mongoose.model('Person', schema);
