require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');

const Person = require('../models/Person');
const BookingState = require('../models/BookingState');
const CourtCase = require('../models/CourtCase');
const bookingNumberList = require('./booking-number-list');
const scrapeBooking = require('./scrape-booking');
const handleDetention = require('./handle-detention');


const seedDatabase = async() => {

  const bookingNumberArray = await bookingNumberList();
  console.log('bookingNumberArray', bookingNumberArray);

  await Promise.all(bookingNumberArray.map(async(bookingNumber) => {
    const scrapeObject = await scrapeBooking(bookingNumber);
    const bookingState = await BookingState.create(scrapeObject);
    let person = await Person.findOne({ swisId: scrapeObject.swisId });

    if(!person) {
      person = await Person.create(scrapeObject);
    }

    let courtCase = await CourtCase.findOne({ caseNumber: scrapeObject.case.courtCaseNumber });
    if(!courtCase) {
      courtCase = await CourtCase.create(scrapeObject.case);
    }
    await handleDetention(scrapeObject, bookingState, person._id, courtCase);
  }));
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
