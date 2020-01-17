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
  foreignField: 'person'
});

schema.statics.countByRace = function(){
  return this.aggregate([

    { '$group' : { _id:'$race', count:{ $sum:1 } } }

  ]
  );
};

schema.statics.countByGender = function(){
  return this.aggregate([

    { '$group' : { _id:'$gender', count:{ $sum:1 } } }

  ]
  );
};

schema.statics.countByAgeRange = function(){
  return this.aggregate([
    {
      $bucket:   {
        groupBy: '$age',
        boundaries: ['0', '18', '25', '31', '46', '60'],
        default: 'Over 60',
        output: {
          'count': { $sum: 1 },
        }
      }
    }

  ]
  );
};



module.exports = mongoose.model('Person', schema);
