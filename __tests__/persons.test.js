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
      age: '39',
      gender: 'female',
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
    // const persons = await Person.create([
    //   {
    //     swisId: '12345678',
    //     age: '39',
    //     gender: 'female',
    //     race: 'White',
    //     height: '5\' 6"',
    //     weight: '160 lbs',
    //     hairColor: 'Brown',
    //     eyeColor: 'Green'
    //   }
    // ]);
    return request(app)
      .get('/api/v1/persons')
      .then(res => {
        
        expect(res.body).toEqual([{
          __v:0,
          _id: person._id,
          age: '39',
          gender: 'female',
          race: 'White',
          height: '5\' 6"',
          weight: '160 lbs',
          hairColor: 'Brown',
          eyeColor: 'Green'
        }]);
      });
  });

  it('gets a single person', async() => {
    return request(app)
      .get(`/api/v1/persons/${person._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v:0,
          _id: person._id,
          age: '39',
          gender: 'female',
          race: 'White',
          height: '5\' 6"',
          weight: '160 lbs',
          hairColor: 'Brown',
          eyeColor: 'Green'
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
