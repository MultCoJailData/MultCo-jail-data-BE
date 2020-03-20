const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  counts: [{
    date: Date,
    count: Number
  }]
});

module.exports = mongoose.model('DailyCount', schema);
