require('dotenv').config();

const Booking = require('./Booking');
const Charge = require('./Charge');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

describe('booking model', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let booking;
  let charge;
  beforeEach(async() => {
    booking = await Booking.create({
      bookingNumber: '2383848',
      swisId: '93829',
      bookingDate: '12/11/2019 09:29 PM'
    });

    charge = await Charge.create({
      bookingNumber: booking.bookingNumber,
      description: 'UNLAW ENTRY OF MV (A Misdemeanor)',
      bail: '$0',
      status: 'Released'
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('associates the charge with the correct booking', async() => {
    
    expect(charge.toObject()).toEqual({
      _id: charge._id,
      bookingNumber: '2383848',
      description: 'UNLAW ENTRY OF MV (A Misdemeanor)',
      bail: '$0',
      status: 'Released',
      __v: 0
    });
  });
});
