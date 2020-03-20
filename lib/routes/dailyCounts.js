const { Router } = require('express');
const DailyCount = require('../models/DailyCount');

module.exports = Router()
  .get('/', (req, res, next) => {
    DailyCount
      .findOne()
      .then(counts => res.send(counts))
      .catch(next);
  });
