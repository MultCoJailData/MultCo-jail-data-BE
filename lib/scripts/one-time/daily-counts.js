// running this script showed us that we were missing a couple of days of scrapes.

require('dotenv').config();
require('../../utils/connect')();
const Detention = require('../../models/Detention');
const mongoose = require('mongoose');
const ONE_DAY = 1000 * 60 * 60 * 24;

const pastDailyCounts = async() => {
  const counts = [];
  let date = new Date(2020, 0, 16);
  while(date < Date.now()) {
    const dailyReleases = await Detention
      .find()
      .where('releaseDate')
      .gt(Number(date))
      .lte(Number(date) + ONE_DAY);
    counts.push({ date, count: dailyReleases.length });
    date = new Date(Number(date) + ONE_DAY);
    console.log(dailyReleases[0]);
  }
  console.log(counts);
};

pastDailyCounts()
  .then(() => console.log('done getting counts'))
  .finally(() => mongoose.connection.close());
