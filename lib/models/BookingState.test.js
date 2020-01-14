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
      bookingNumber: '1489454',
      assignedFacility: 'MCDC',
      projectedReleaseDate: 'Unknown',
      cases: [
        {
          _id: bookingState.cases[0]._id,
          courtCaseNumber: '19CR27952',
          daCaseNumber: '2401669',
          citationNumber: 'None',
          charges: [
            {
              _id: bookingState.cases[0].charges[0]._id,
              bail: '$5,000',
              description: 'THEFT I (C Felony)',
              status: 'Unsentenced',
            }
          ],
        }
      ],
      dateAdded: expect.any(Date),
      __v: 0
    }
    );
  });
});
