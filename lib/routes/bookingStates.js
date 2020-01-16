const { Router } = require('express');
const BookingState = require('../models/BookingState');

module.exports = Router()

  .get('/', (req, res, next) => {
    BookingState
      .find()
      .then(bookingStates => res.send(bookingStates))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    BookingState
      .findById(req.params.id)
      .then(bookingState => res.send(bookingState))
      .catch(next);
  });
