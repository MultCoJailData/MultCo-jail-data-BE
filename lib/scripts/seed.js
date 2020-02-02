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

  await Promise.all(bookingNumberArray.map(async(bookingNumber) => {
    const scrapeObject = await scrapeBooking(bookingNumber);
    // with some helper static methods this function gets a lot easier to read
    const [bookingState, person, courtCase] = await Promise.all([
      BookingState.create(scrapeObject),
      Person.findOneOrCreate(scrapeObject),
      CourtCase.findOneOrCreate(scrapeObject)
    ]);

    return handleDetention(scrapeObject, bookingState, person._id, courtCase);
  }));
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
