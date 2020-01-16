require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

const Detention = require('../lib/models/Detention');
const Person = require('../lib/models/Person');
const CourtCase = require('../lib/models/CourtCase');
const BookingState = require('../lib/models/BookingState');
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
  let courtCase;
  let bookingState;

  beforeEach(async() => {
    bookingState = await BookingState.create({
      dateAdded: Date.now(),
      assignedFacility: 'MCDC',
      caseNumber: '1234567'
    });

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

    courtCase = await CourtCase.create({
      caseNumber: '1234567',
      description: 'UNLAW ENTRY OF MV (A Misdemeanor)',
      bail: '$0',
      status: 'Released'
    });

    detention = await Detention.create({
      bookingNumber: '12345678',
      bookingDate: '1970-01-01T00:00:02.004Z',
      person: person._id,
      arrestingAgency: 'Portland Police',
      bookingStates: bookingState._id,
      caseStates: courtCase._id,
      currentBookingState: bookingState._id,
      currentCaseState: courtCase._id
    });

    bookingState.detentionId = detention._id;
    bookingState.save();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all detentions', async() => {
    const detentions = await Detention.create([
      {
        bookingNumber: '123678',
        bookingDate: Date.now(),
        person: person._id,
        arrestingAgency: 'Portland Police',
        bookingStates: bookingState._id,
        caseStates: courtCase._id,
        currentBookingState: bookingState._id,
        currentCaseState: courtCase._id
      },
      {
        bookingNumber: '123568',
        bookingDate: Date.now(),
        person: person._id,
        arrestingAgency: 'Portland Police',
        bookingStates: bookingState._id,
        caseStates: courtCase._id,
        currentBookingState: bookingState._id,
        currentCaseState: courtCase._id
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
        console.log(res.body);
        expect(res.body).toEqual({
          _id: detention._id,
          bookingNumber: '12345678',
          bookingDate: '1970-01-01T00:00:02.004Z',
          person: person._id,
          arrestingAgency: 'Portland Police',
          bookingStates: [bookingState._id],
          caseStates: [courtCase._id],
          currentBookingState: bookingState._id,
          currentCaseState: courtCase._id,
          __v: 0
        });
      });
  });
  it('counts intake by agency', async() => {
    return request(app)
      .get('/api/v1/detentions/countByAgency')
      .then(res => {
        expect(res.body).toEqual([{ '_id': 'Portland Police', 'count': 1 }]);
      });
  });
});
