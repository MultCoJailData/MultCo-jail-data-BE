require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

const Detention = require('../lib/models/Detention');
const Person = require('../lib/models/Person');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let detention;
  let person;
  beforeEach(async() => {
    person = await Person.create({
      swisId: '12345678',
      fullName: 'John Doe',
      age: '39',
      gender: 'male',
      race: 'white',
      height: '5\' 6"',
      weight: '160 lbs',
      hairColor: 'Brown',
      eyeColor: 'Green'
    });

    detention = await Detention.create({
      bookingNumber: '12345678',
      bookingDate: Date.now(),
      person: person._id, 
      arrestingAgency: 'Portland Police',
      bookingStates: [
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Booking'
        }
      ],
      caseStates: [
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Case'
        }
      ],
      currentBookingState:     {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Booking'
      },
      currentCaseState:     {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Case'
      }
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all detentions', async() => {
    const detentions = await detention.create([
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
      .get('/api/v1/detentions')
      .then(res => {
        detentions.forEach(detention => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(detention)));
        });
      });
  });

  it('gets a single detention', async() => {
    return request(app)
      .get(`/api/v1/detentions/${detention._id}`)
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
