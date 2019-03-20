const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const Poll = require('../../lib/models/Poll');

describe('Poll model', () => {
  beforeEach(() => connect());

  beforeEach(() => mongoose.connection.dropDatabase());

  afterAll(done => mongoose.connection.close(done));

  it('creates a poll', () => {
    return Poll
      .create({
        question: 'What is life?',
        options: ['pointless', 'beautiful', 'more complex than you think'],
        email: 'emms@email.com'
      })
      .then(poll => {
        expect(poll.toJSON()).toEqual({
          question: 'What is life?',
          options: ['pointless', 'beautiful', 'more complex than you think'],
          email: 'emms@email.com',
          _id: expect.any(Object),
          __v: expect.any(Number)
        });
      });
  });
});
