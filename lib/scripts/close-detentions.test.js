require('dotenv').config();
const Detention = require('../models/Detention');
const closeDetentions = require('./close-detentions');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

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

  it('puts a release date on detentions not in booking number list', async() => {
    await Detention.create([
      {
        bookingNumber: '11111',
        bookingDate: new Date('2019', '1', '1')
      },
      {
        bookingNumber: '22222',
        bookingDate: new Date('2019', '1', '1')
      },
      {
        bookingNumber: '33333',
        bookingDate: new Date('2019', '1', '1')
      },
      {
        bookingNumber: '44444',
        bookingDate: new Date('2019', '1', '1'),
        releaseDate: new Date('2019', '1', '2')
      },
    ]);
    const closedDetentions = await closeDetentions(['11111', '22222']);
    expect(JSON.parse(JSON.stringify(closedDetentions))).toEqual([
      {
        bookingStates: [],
        caseStates: [],
        _id: expect.any(String),
        bookingNumber: '33333',
        bookingDate: expect.any(String),
        __v: 0,
        releaseDate: expect.any(String)
      }
    ]);
  });
});
