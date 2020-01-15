require('dotenv').config();
const scrapeHTML = require('../scripts/scrape-html');

// const Booking = require('./Booking');
const Person = require('./Person');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const fs = require('fs').promises;


describe('person model', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let person;

  beforeEach(async() => {
    person = await Person.create({
      swisId: '93829',
      bookingNumber: 'aksdlhf'
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has a required swisId', () => {
    const person = new Person();
    const { errors } = person.validateSync();

    expect(errors.swisId.message).toEqual('Path `swisId` is required.');
  });

  it('can create from scrapeObject', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrapeObject = scrapeHTML(html);
    const person = await Person.create(scrapeObject);
    return expect(person.toObject()).toEqual({
      _id: person._id,
      fullName: 'Doe, John',
      age: '58',
      gender: 'Male',
      race: 'Black',
      height: '6 ft 0 in',
      weight: '200 lbs',
      hairColor: 'XXX',
      eyeColor: 'Brown',
      swisId: '12345',
      __v: 0
    });
  });
});
