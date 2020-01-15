require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');


const BookingState = require('../models/BookingState');
const bookingNumberList = require('./booking-number-list');
const scrapeBooking = require('./scrape-booking');

const seedDatabase = async() => {

  const bookingNumberArray = await bookingNumberList();

  await Promise.all(bookingNumberArray.map(async(bookingNumber) => {
    const scrapeObject = await scrapeBooking(bookingNumber);
    console.log(scrapeObject);
    await BookingState.create(scrapeObject);

  }));
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
