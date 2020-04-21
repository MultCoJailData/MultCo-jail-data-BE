// Fix release dates that have been set mistakenly after a missed scrape.

require('dotenv').config();
require('../../utils/connect')();
const Detention = require('../../models/Detention');
const BookingState = require('../../models/BookingState');
const mongoose = require('mongoose');

const fixReleaseDates = async() => {
  const releasedDetentions = await Detention
    .find()
    .exists('releaseDate');
  const lastScrapeDate = new Date();
  if(lastScrapeDate.getUTCHours() < 12) {
    lastScrapeDate.setUTCDate(lastScrapeDate.getUTCDate() - 1);
  }
  lastScrapeDate.setUTCHours(12, 0, 0, 0);
  await Promise.all(releasedDetentions
    .map(async(detention) => {
      const bookingStates = await BookingState
        .find({ detentionId: detention._id })
        .sort('-dateAdded');
      if(Number(detention.releaseDate) < Number(bookingStates[0].dateAdded) &&
        Number(bookingStates[0].dateAdded) < Number(lastScrapeDate))
      {
        detention.releaseDate = bookingStates[0].dateAdded;
        detention.releaseDate.setUTCDate(detention.releaseDate.getUTCDate() + 1);
        await detention.save();
      }
    }));
};

fixReleaseDates()
  .then(() => console.log('done setting release dates'))
  .finally(() => mongoose.connection.close());
