const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()

  .get('/', (req, res, next) => {

    Person
      .find(req.query)
      .then(persons => {
        const anonymizedPersons = persons.map(person => {
          person.fullName = undefined;
          person.swisId = undefined;
          return person;
        });
        res.send(anonymizedPersons);})
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
  .get('/:id', (req, res, next) => {
    Person
      .findById(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  });
