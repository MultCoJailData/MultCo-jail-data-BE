const { Router } = require('express');
const Detention = require('../models/Detention');

module.exports = Router()

  .get('/', (req, res, next) => {
    Detention
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Detention
      .findById(req.params.id)
      .then(detention => res.send(detention))
      .catch(next);
  });
