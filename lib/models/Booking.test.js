require('dotenv').config();

const Detention = require('./Detention');
const Booking = require('./Booking');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let booking;

  beforeEach(async() => {
    booking = await Booking.create({
      bookingNumber: '2383848',
      swisId: '93829',
      bookingDate: '12/11/2019 09:29 PM'
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a detention when a booking is created', async() => {
    const detention = await Detention.findOne({
      bookingNumber: '2383848',
    });
    expect(detention.toObject()).toEqual({
      _id: detention._id,
      bookingNumber: '2383848',
      bookingDate: '12/11/2019 09:29 PM',
      states: [booking._id],
      __v: 1
    });
  });
  it('adds a booking to an existing detention', async() => {
    const bookingTwo = await Booking.create({
      bookingNumber: '2383848',
      swisId: '93829',
      bookingDate: '12/12/2019 09:29 PM'
    });
    const detention = await Detention.findOne({
      bookingNumber: '2383848',
    });
    expect(detention.toObject()).toEqual({
      _id: detention._id,
      bookingNumber: '2383848',
      bookingDate: '12/11/2019 09:29 PM',
      states: [booking._id, bookingTwo._id],
      __v: 2
    });
  });
});
