require('dotenv').config();
const scrapeHTML = require('../scripts/scrape-html');
const BookingState = require('./BookingState');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const fs = require('fs').promises;


describe('booking model', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a bookingState from scrapeObject', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrapeObject = scrapeHTML(html);
    const bookingState = await BookingState.create(scrapeObject);
    return expect(bookingState.toObject()).toEqual({
      _id: bookingState._id,
      assignedFacility: 'MCDC',
      projectedReleaseDate: 'Unknown',
      dateAdded: expect.any(Date),
      __v: 0
    }
    );
  });
});
