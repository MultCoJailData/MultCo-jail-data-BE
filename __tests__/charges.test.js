require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const Charge = require('../lib/models/Case');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let charge;
  beforeEach(async() => {
    charge = await Charge.create({
      bookingNumber: '12345678',
      description: 'Felony badness',
      bail: '$100',
      status: 'Released'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all charges', async() => {
    const charges = await Charge.create([
      {
        bookingNumber: '12345679',
        description: 'Misdemeanor badness',
        bail: '$100',
        status: 'Released'
      },
      {
        bookingNumber: '12345670',
        description: 'Arson',
        bail: '$100',
        status: 'Released'
      },
    ]);
    return request(app)
      .get('/api/v1/charges')
      .then(res => {
        charges.forEach(charge => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(charge)));
        });
      });
  });

  it('gets a single charge', async() => {
    return request(app)
      .get(`/api/v1/charges/${charge._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          bookingNumber: '12345678',
          description: 'Felony badness',
          bail: '$100',
          status: 'Released',
          __v: 0
        });
      });
  });
});
