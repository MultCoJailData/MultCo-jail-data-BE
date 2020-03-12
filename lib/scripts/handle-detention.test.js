require('dotenv').config();
const handleDetention = require('../scripts/handle-detention');
const scrapeHTML = require('../scripts/scrape-html');
const BookingState = require('../models/BookingState');
const Person = require('../models/Person');
const CourtCase = require('../models/CourtCase');
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

  it('creates a detention', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrape = scrapeHTML(html);
    const bookingState = await BookingState.create(scrape);
    const person = await Person.create(scrape);
    const courtCase = await CourtCase.create(scrape.case);
    const detention = await handleDetention(scrape, bookingState, person._id, courtCase);
    const prepare = (obj) => JSON.parse(JSON.stringify(obj));
    return expect (prepare(detention)).toEqual({
      bookingStates: [bookingState._id.toString()],
      caseStates: [courtCase._id.toString()],
      currentCaseState: courtCase._id.toString(),
      _id: detention._id.toString(),
      bookingNumber: '1489454',
      bookingDate: expect.any(String),
      person: person.id.toString(),
      arrestingAgency: 'MCSO Transports',
      __v: expect.any(Number),
      currentBookingState: bookingState._id.toString()
    });
  });

  it('creates a detention with no cases', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page-no-cases.html');
    const html = buffer.toString();
    const scrape = scrapeHTML(html);
    const bookingState = await BookingState.create(scrape);
    const person = await Person.create(scrape);
    const detention = await handleDetention(scrape, bookingState, person._id, undefined);
    return expect (detention.toObject()).toEqual({
      bookingStates: [bookingState._id],
      caseStates: [],
      _id: detention._id,
      bookingNumber: '1489454',
      bookingDate: expect.any(Date),
      person: person._id,
      arrestingAgency: 'MCSO Transports',
      __v: expect.any(Number),
      currentBookingState: bookingState._id
    });
  });
});
