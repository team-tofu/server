const { Router } = require('express');
const Poll = require('../models/Poll');
const ensureAuth = require('../middleware/ensureAuth');
const { populateUsers } = require('../services/auth');

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Poll
      .find()
      .lean()
      .then(polls => populateUsers(polls))
      .then(poll => res.send(poll))
      .catch(next);
  })

  .post('/', ensureAuth(), (req, res, next) => {
    const { question, options } = req.body;
    Poll
      .then(polls => populateUsers(polls))
      .create({ question, options, email: req.user.email })
      .then(poll => {
        res.send(poll);
      })
      .catch(next);
  });
