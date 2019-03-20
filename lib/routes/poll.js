const { Router } = require('express');
const Poll = require('../models/Poll');
const ensureAuth = require('../middleware/ensureAuth');
const { HttpError } = require('../middleware/error');


module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Poll
      .find()
      .lean()
      .then(poll => res.send(poll))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Poll
      .findById(id)
      .then(foundPoll => {
        if(!foundPoll) {
          return new HttpError(404, `No purchase found with id: ${id}`);
        }
        res.send(foundPoll);
      })
      .catch(next);
  })

  .post('/', ensureAuth(), (req, res, next) => {
    const { question, options } = req.body;
    Poll
      .create({ question, options, email: req.user.email })
      .then(poll => {
        res.send(poll);
      })
      .catch(next);
  });

  
