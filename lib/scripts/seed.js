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
    try {
      const scrapeObject = await scrapeBooking(bookingNumber);
      const bookingState = await BookingState.create(scrapeObject);
      const person = Person.findOne({ swisId: scrapeObject.swisId });
      if(!person) {
        Person.create(scrapeObject);
      }
      handleDetention(scrapeObject, bookingState, person._id);
    } catch(err){
      errors.push(err);
    }

    let courtCase = await CourtCase.findOne({ caseNumber: scrapeObject.case.courtCaseNumber });
    if(!courtCase) {
      courtCase = await CourtCase.create(scrapeObject.case);
    }
    await handleDetention(scrapeObject, bookingState, person._id, courtCase);
  }));
  console.log(errors);
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
