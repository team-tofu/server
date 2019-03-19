const { Router } = require('express');
const Poll = require('../models/Poll');

module.exports = Router()
  .get('/', (req, res, next) => {
    Poll
      .find()
      .lean()
      .then(poll => res.send(poll))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    const { question, options } = req.body;
    Poll
      .create({ question, options, email: req.user.email })
      .then(poll => {
        res.send(poll);
      })
      .catch(next);
  });
