require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const CourtCase = require('../lib/models/CourtCase');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let courtCase;
  beforeEach(async() => {
    courtCase = await CourtCase.create(
      {
        bookingNumber: '12345679',
        caseNumber: 1265543,
        charges: [{
          description: 'Arson',
          bail: '100',
          status: 'Released'
        }], 
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all courtCases', async() => {
    const courtCases = await CourtCase.create([
      {
        caseNumber: 1265543,
        charges: [{
          description: 'Arson',
          bail: '100',
          status: 'Released'
        }], 
      },
    ]);
    return request(app)
      .get('/api/v1/courtCases')
      .then(res => {
        courtCases.forEach(courtCase => {
          expect(res.body).toContainEqual[(JSON.parse(JSON.stringify(courtCase)))];
        });
      });
  });

  it('gets a single courtCase', async() => {
    return request(app)
      .get(`/api/v1/courtCases/${courtCase._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          caseNumber: '1265543',
          charges: [{
            _id: expect.any(String),
            description: 'Arson',
            bail: 100,
            status: 'Released'
          }], 
          __v: 0,
          detention: [],
          id: expect.any(String)
        });
      });
  });
});
