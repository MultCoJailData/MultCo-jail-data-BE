const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()

  .get('/', (req, res, next) => {
    Person
      .find()
      .then(persons => res.send(persons))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Person
      .findById(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  });
