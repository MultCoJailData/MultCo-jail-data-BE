require('dotenv').config();
require('../utils/connect')();
const BookingState = require('../models/BookingState');
const mongoose = require('mongoose');
const ONE_DAY = 1000 * 60 * 60 * 24;

const pastDailyCounts = async() => {
  let date = new Date(2020, 1, 1,);
  while(date < Date.now()) {
    const dailyDetentions = await BookingState
      .find()
      .where('dateAdded').gte(date)
      .where('dateAdded').lte(date + ONE_DAY);
    date = new Date(date + ONE_DAY);
    console.log(dailyDetentions.length);
  }
};

pastDailyCounts()
  .then(() => console.log('done getting counts'))
  .finally(() => mongoose.connection.close());
