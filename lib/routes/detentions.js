const { Router } = require('express');
const Detention = require('../models/Detention');

module.exports = Router()

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    delete req.query.page;
    delete req.query.perPage;
    Detention
      .find(req.query)
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(detentions => res.send(detentions))
      .catch(next);
  })
  .get('/avgDetentionDuration', (req, res, next) => {
    Detention
      .avgDetentionDuration()
      .then(detention  => res.send(detention))
      .catch(next);
  })
  .get('/avgDetentionByRace', (req, res, next) => {
    Detention
      .avgDetentionByRace()
      .then(detention  => res.send(detention))
      .catch(next);
  })
  .get('/avgDetentionByGender', (req, res, next) => {
    Detention
      .avgDetentionByGender()
      .then(detention  => res.send(detention))
      .catch(next);
  })
  .get('/countByTime', (req, res, next) => {
    Detention
      .countByTime()
      .then(detention  => res.send(detention))
      .catch(next);
  })
  .get('/countByAgency', (req, res, next) => {
    Detention
      .countByAgency()
      .then(detention  => res.send(detention))
      .catch(next);
  })
  .get('/countChargesByRace', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    Detention
      .getChargesByRace(Number(page), Number(perPage))
      .then(charges => res.send(charges))
      .catch(next);
  })
  .get('/countChargesByAgency', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    Detention
      .getChargesByAgency(Number(page), Number(perPage))
      .then(charges => res.send(charges))
      .catch(next);
  })
  .get('/countChargesByGender', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    Detention
      .getChargesByGender(Number(page), Number(perPage))
      .then(charges => res.send(charges))
      .catch(next);
  })

  .get('/currentDetentions', (req, res, next) => {
    Detention
      .getCurrentDetentions()
      .then(detentions => res.send(detentions))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Detention
      .findById(req.params.id)
      .populate({ path: 'person', select: { fullName: false, swisId: false } })
      .populate('currentBookingState')
      .populate('currentCaseState')
      .then(detention => res.send(detention))
      .catch(next);
  });

  
