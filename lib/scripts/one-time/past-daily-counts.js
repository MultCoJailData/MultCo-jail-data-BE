// Run this only once ever on Heroku, or there will be problems
// The purpose of this script was to set up daily counts from before we 
// got counts from our daily seed script.

require('dotenv').config();
require('../../utils/connect')();
const Detention = require('../../models/Detention');
const DailyCount = require('../../models/DailyCount');
const mongoose = require('mongoose');
const ONE_DAY = 1000 * 60 * 60 * 24;

const pastDailyCounts = async() => {
  const counts = [];
  let date = new Date(2020, 0, 16);
  while(date < Date.now()) {
    const dailyDetentions = await Detention
      .find()
      .and([{ bookingDate: { $not: { $gt: Number(date) } } },
        { releaseDate: { $not: { $lt: Number(date) + ONE_DAY } } }
      ]);

    if(dailyDetentions.length) {
      counts.push({ date, count: dailyDetentions.length });
    }
    date = new Date(Number(date) + ONE_DAY);
    // console.log(dailyDetentions);
  }
  console.log(counts);
  await DailyCount.create({ counts });
};

pastDailyCounts()
  .then(() => console.log('done getting counts'))
  .finally(() => mongoose.connection.close());
