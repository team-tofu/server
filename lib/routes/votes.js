const { Router } = require('express');
const Vote = require('../models/Vote');
const ensureAuth = require('../middleware/ensureAuth');
const HttpError = 

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { poll, optionChose } = req.body;
    Vote
      .create({ poll, optionChose, email: req.user.email })
      .then(vote => {
        res.send(vote);
      })
      .catch(next);
  })

  .get('/', ensureAuth(), (req, res, next) => {
    Vote
      .find()
      .lean()
      .then(vote => res.send(vote))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Vote
      .findById(id)
      .then(foundVote => {
        if(!foundVote) {
          return new HttpError(404, `No votes found with id: ${id}`);
        }
        res.send(foundVote);
      })
      .catch(next);
  });
