require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

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

  let person;
  beforeEach(async() => {
    person = await Person.create({
      swisId: '12345678',
      fullName: 'John Doe',
      age: '39',
      gender: 'male',
      race: 'White',
      height: '5\' 6"',
      weight: '160 lbs',
      hairColor: 'Brown',
      eyeColor: 'Green'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all persons', async() => {
    const persons = await Person.create([
      {
        swisId: '12345678',
        fullName: 'Jane Doe',
        age: '39',
        gender: 'female',
        race: 'White',
        height: '5\' 6"',
        weight: '160 lbs',
        hairColor: 'Brown',
        eyeColor: 'Green'
      }
    ]);
    return request(app)
      .get('/api/v1/persons')
      .then(res => {
        persons.forEach(person => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(person)));
        });
      });
  });

  it('gets a single person', async() => {
    return request(app)
      .get(`/api/v1/persons/${person._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          swisId: '12345678',
          fullName: 'John Doe',
          age: '39',
          gender: 'male',
          race: 'White',
          height: '5\' 6"',
          weight: '160 lbs',
          hairColor: 'Brown',
          eyeColor: 'Green',
          __v: 0
        });
      });
  });
  it('counts intake by race', async() => {
    return request(app)
      .get('/api/v1/persons/countByRace')
      .then(res => {
        expect(res.body).toEqual([{ '_id': 'White', 'count': 1 }]);
      });
  });
});
