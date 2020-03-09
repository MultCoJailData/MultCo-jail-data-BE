require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const BookingState = require('../lib/models/BookingState');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('bookingState routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let bookingState;
  beforeEach(async() => {
    bookingState = await BookingState.create({
      dateAdded: '2019-11-17T10:12:00.000+00:00',
      assignedFacility: 'MCDC',
      caseNumber: '1234567'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all bookingStates', async() => {
    const bookingStates = await BookingState.create([{
      dateAdded: '2019-11-17T10:12:00.000+00:00',
      assignedFacility: 'MCDC',
      caseNumber: '1234567'
    }]);
    return request(app)
      .get('/api/v1/bookingStates')
      .then(res => {
        bookingStates.forEach(bookingState => {
          expect(res.body).toContainEqual[(JSON.parse(JSON.stringify(bookingState)))];
        });
      });
  });

  it('gets a single bookingState', async() => {
    return request(app)
      .get(`/api/v1/bookingStates/${bookingState._id}`)
      .then(res => {
        expect(res.body).toEqual({
          dateAdded: '2019-11-17T10:12:00.000Z',
          assignedFacility: 'MCDC',
          caseNumber: 1234567,
          __v: 0,
          _id: bookingState.id
        });
      });
  });
});
