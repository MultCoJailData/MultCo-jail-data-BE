require('dotenv').config();

const Booking = require('./BookingState');
const CourtCase = require('./CourtCase');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const scrapeHTML = require('../scripts/scrape-html');

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
      caseNumber: '1234567',
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
      charges: [],
      __v: 0
    });
  });
  it('can create from scrapeObject', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrapeObject = scrapeHTML(html);
    const chargex = await CourtCase.create(scrapeObject);
    return expect(chargex.toObject()).toEqual({
      _id: chargex._id,
      charges: [],
      __v: 0
    });
  });
});
