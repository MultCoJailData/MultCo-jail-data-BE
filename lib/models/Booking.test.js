require('dotenv').config();

const Detention = require('./Detention');
const Booking = require('./Booking');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(() => {

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a detention when a booking is created', async() => {
    const booking = await Booking.create({
      bookingNumber: '2383848',
      swisID: '93829'
    });
    expect()
  });
});
