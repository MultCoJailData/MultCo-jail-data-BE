require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');

const Booking = require('../models/Booking');
const { bookingNumberList } = require('./page-list');
const { scrapeBooking } = require('./booking-scraper');

const delay = (ms) => new Promise(_ => setTimeout(_, ms));

const seedDatabase = async() => {

  const bookingNumberArray = await bookingNumberList();

  await Promise.all(bookingNumberArray.map(async(bookingNumber, i) => {
    await delay(i * 2000);
    const bookingObject = await scrapeBooking(bookingNumber);
    await Booking.create(bookingObject);
  }));
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
