require('dotenv').config();

// const Booking = require('./Booking');
const Person = require('./Person');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

describe('booking model', () => {
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
  it('has a required bookingNumber', () => {
    const person = new Person();
    const { errors } = person.validateSync();

    expect(errors.bookingNumber.message).toEqual('Path `bookingNumber` is required.');
  });
});
