require('dotenv').config();
const Detention = require('./Detention');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const scrapeHTML = require('../scripts/scrape-html');
const fs = require('fs').promises;

describe('detention', () => {
  beforeAll(() => {
    connect();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has a required booking number', () => {
    const detention = new Detention();
    const { errors } = detention.validateSync();

    expect(errors.bookingNumber.message).toEqual('Path `bookingNumber` is required.');
  });

  it('has a required booking date', () => {
    const detention = new Detention();
    const { errors } = detention.validateSync();

    expect(errors.bookingNumber.message).toEqual('Path `bookingNumber` is required.');
  });
  it('can create from scrapeObject', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrapeObject = scrapeHTML(html);
    const detention = await Detention.create(scrapeObject);
    return expect(detention.toObject()).toEqual({
      _id: detention._id,
      arrestingAgency: 'MCSO Transports',
      bookingDate: expect.any(Date),
      bookingNumber: '1489454',
      bookingStates: [],
      caseStates: [],
      __v: 0
    });
  });
});
