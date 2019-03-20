const { Router } = require('express');
const Vote = require('../models/Vote');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Vote
      .find()
      .lean()
      .then(vote => res.send(vote))
      .catch(next);
  });
