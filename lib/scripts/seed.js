require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');

const Person = require('../models/Person');
const BookingState = require('../models/BookingState');
const bookingNumberList = require('./booking-number-list');
const scrapeBooking = require('./scrape-booking');
const handleDetention = require('./handle-detention');


const seedDatabase = async() => {

  const bookingNumberArray = await bookingNumberList();
  const errors = [];
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
  }));
  console.log(errors);
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
