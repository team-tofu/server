const { Router } = require('express');
const Poll = require('../models/Poll');

module.exports = Router()
  .get('/', (req, res, next) => {
    Poll
      .find()
      .lean()
      .then(poll => res.send(poll))
      .catch(next);
  });
