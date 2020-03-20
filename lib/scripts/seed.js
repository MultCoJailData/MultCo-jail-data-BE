require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');

const Person = require('../models/Person');
const BookingState = require('../models/BookingState');
const CourtCase = require('../models/CourtCase');
const DailyCount = require('../models/DailyCount');
const bookingNumberList = require('./booking-number-list');
const scrapeBooking = require('./scrape-booking');
const handleDetention = require('./handle-detention');


const seedDatabase = async() => {

  const bookingNumberArray = await bookingNumberList();
  const dailyCount = await DailyCount.findOne();
  const date = new Date();
  dailyCount.counts.push({ date, count: bookingNumberArray.length });
  await dailyCount.save();

  await Promise.all(bookingNumberArray.map(async(bookingNumber) => {
    const scrapeObject = await scrapeBooking(bookingNumber);
    const bookingState = await BookingState.create(scrapeObject);
    let person = await Person.findOne({ swisId: scrapeObject.swisId });

    if(!person) {
      person = await Person.create(scrapeObject);
    }
    let courtCase;
    if(scrapeObject.case) {
      courtCase = await CourtCase.findOne({ caseNumber: scrapeObject.case.caseNumber });
      if(!courtCase) {
        courtCase = await CourtCase.create(scrapeObject.case);
      }
    }
    await handleDetention(scrapeObject, bookingState, person._id, courtCase);
  }));
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
