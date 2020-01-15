require('dotenv').config();
const handleDetention = require('../scripts/handle-detention');
const scrapeHTML = require('../scripts/scrape-html');
const BookingState = require('../models/BookingState');
const Person = require('../models/Person');
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

  it('creates a detention with correct stuff', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrape = scrapeHTML(html);
    const bookingState = await BookingState.create(scrape);
    const person = await Person.create(scrape);
    const detention = await handleDetention(scrape, bookingState, person._id);
    console.log(detention.toObject());
    return expect (detention.toObject()).toEqual({
      bookingStates: [bookingState._id],
      caseStates: [],
      _id: detention._id,
      bookingNumber: '1489454',
      bookingDate: expect.any(Date),
      person: person._id,
      arrestingAgency: 'MCSO Transports',
      __v: 0,
      currentBookingState: bookingState._id
    });
  });
})