require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
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

  it('posts a vote', () => {
    return request(app)
      .post('/')
      .send({
        poll: '',
        optionsChose: ['one', 'two', 'three'],
        email: 'newemail@email.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          email: '123456@email.com',
          _id: expect.any(String),
          poll: 'Hello?',
          optionsChose: ['one', 'two', 'three']
        });
      });
  });
});

