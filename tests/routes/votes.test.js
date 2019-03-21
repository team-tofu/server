require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const Poll = require('../../lib/models/Poll');
const Vote = require('../../lib/models/Vote');

const seedData = require('../../tests/seedData');

const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

describe('votes routes', () => {
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(() => {
    return seedData(100);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  

  const createdPoll = () => {
    return Poll.create({
      question: 'Hello?',
      options: ['one', 'two', 'three'],
      email: 'newemail@email.com'
    })
      .then(poll => poll);
  };

  const createdVote = () => {
    return createdPoll()
      .then(poll => {
        return Vote.create({
          poll: poll.toJSON()._id,
          optionChose: 2,
          email: '123456@email.com'
        });
        
      });
  };

  it('posts a vote', () => {
    return createdVote()
      .then(vote => {
        return request(app)
          .post('/votes')
          .send(vote);
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          email: '123456@email.com',
          poll: expect.any(String),
          optionChose: 2
        });
      });
  });
});
