// Run this only once ever on Heroku, or there will be problems

require('dotenv').config();
require('../utils/connect')();
const BookingState = require('../models/BookingState');
const DailyCount = require('../models/DailyCount');
const mongoose = require('mongoose');
const ONE_DAY = 1000 * 60 * 60 * 24;

const pastDailyCounts = async() => {
  const counts = [];
  let date = new Date(2020, 0, 16);
  while(date < Date.now()) {
    const dailyDetentions = await BookingState
      .find()
      .where('dateAdded')
      .gte(Number(date))
      .lte(Number(date) + ONE_DAY);
    if(dailyDetentions.length) {
      counts.push({ date, count: dailyDetentions.length });
    }
    date = new Date(Number(date) + ONE_DAY);
  }
  await DailyCount.create({ counts });
};

pastDailyCounts()
  .then(() => console.log('done getting counts'))
  .finally(() => mongoose.connection.close());
