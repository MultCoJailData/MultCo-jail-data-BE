const { Router } = require('express');
const CourtCase = require('../models/CourtCase');

module.exports = Router()

  .get('/', (req, res, next) => {
    CourtCase
      .find()
      .then(courtCases => res.send(courtCases))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    CourtCase
      .findById(req.params.id)
      .then(courtCase => res.send(courtCase))
      .catch(next);
  });
