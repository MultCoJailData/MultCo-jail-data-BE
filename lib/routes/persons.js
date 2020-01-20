const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 40, minAge = 0, maxAge = Infinity } = req.query;
    delete req.query.page;
    delete req.query.perPage;
    delete req.query.minAge;
    delete req.query.maxAge;
    delete req.query.fullName;
    delete req.query.swisId;

    Person
      .find(req.query)
      .gte('age', minAge)
      .lte('age', maxAge)
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .select({ fullName: false, swisId: false })
      .then(persons => res.send(persons))
      .catch(next);
  })
  .get('/countByAgeRange', (req, res, next) => {
    Person
      .countByAgeRange()
      .then(person  => res.send(person))
      .catch(next);
  })
  .get('/countByRace', (req, res, next) => {
    Person
      .countByRace()
      .then(person  => res.send(person))
      .catch(next);
  })
  .get('/countByGender', (req, res, next) => {
    Person
      .countByGender()
      .then(person  => res.send(person))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Person
      .findById(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  });
