const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()

  .get('/', (req, res, next) => {
    if(req.query){
      delete req.params.fullName;
      delete req.params.swisId;
    }
    console.log(req.query);
    Person
      .find(req.query)
      .then(persons => res.send(persons))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Person
      .findById(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  });
