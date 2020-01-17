const { Router } = require('express');
const BookingState = require('../models/BookingState');

module.exports = Router()

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    delete req.query.page;
    delete req.query.perPage;
    BookingState
      .find(req.query)
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(bookingStates => res.send(bookingStates))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    BookingState
      .findById(req.params.id)
      .then(bookingState => res.send(bookingState))
      .catch(next);
  });
