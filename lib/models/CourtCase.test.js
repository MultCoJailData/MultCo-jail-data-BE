require('dotenv').config();

const Booking = require('./BookingState');
const CourtCase = require('./CourtCase');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
// const fs = require('fs').promises;
// const scrapeHTML = require('../scripts/scrape-html');

describe('booking model', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let booking;
  let charge;
  beforeEach(async() => {
    booking = await Booking.create({
      bookingNumber: '2383848',
      swisId: '93829',
      bookingDate: '12/11/2019 09:29 PM'
    });

    charge = await CourtCase.create({
      bookingNumber: booking.bookingNumber,
      description: 'UNLAW ENTRY OF MV (A Misdemeanor)',
      bail: '$0',
      status: 'Released'
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('associates the charge with the correct booking', async() => {

    expect(charge.toObject()).toEqual({
      _id: charge._id,
      bookingNumber: '2383848',
      description: 'UNLAW ENTRY OF MV (A Misdemeanor)',
      bail: '$0',
      status: 'Released',
      __v: 0
    });
  });
  // it('can create from scrapeObject', async() => {
  //   const buffer = await fs.readFile('lib/test-data/test-page.html');
  //   const html = buffer.toString();
  //   const scrapeObject = scrapeHTML(html);
  //   console.log(scrapeObject);
  //   const charge = await Charge.create(scrapeObject);
  //   return expect(charge.toObject()).toEqual({
  //     _id: charge._id,
  //     fullName: 'Doe, John',
  //     age: '58',
  //     gender: 'Male',
  //     race: 'Black',
  //     height: '6 ft 0 in',
  //     weight: '200 lbs',
  //     hairColor: 'XXX',
  //     eyeColor: 'Brown',
  //     swisId: '12345',
  //     __v: 0
  //   });
  // });
});
