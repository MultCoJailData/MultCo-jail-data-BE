const { Router } = require('express');
const CourtCase = require('../models/CourtCase');

module.exports = Router()

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    delete req.query.page;
    delete req.query.perPage;
    CourtCase
      .find(req.query)
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .populate('detention', { _id: true })
      .then(courtCases => res.send(courtCases))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    CourtCase
      .findById(req.params.id)
      .populate('detention')
      .then(courtCase => res.send(courtCase))
      .catch(next);
  });
