const { Router } = require('express');
const Charge = require('../models/Charge');

module.exports = Router()

  .get('/', (req, res, next) => {
    Charge
      .find()
      .then(charges => res.send(charges))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Charge
      .findById(req.params.id)
      .then(charge => res.send(charge))
      .catch(next);
  });
