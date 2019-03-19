require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('./seedData');

const request = require('supertest');
const app = require('../lib/app');

describe('polls routes', () => {
  beforeEach(() => {
    return seedData(100);
  });

  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a poll', () => {
    return request(app)
      .post('/')
      .send({
        question: 'Hello?',
        options: ['one', 'two', 'three'],
        email: 'newemail@email.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          email: 'newemail@email.com',
          _id: expect.any(String),
          question: 'Hello?',
          options: ['one', 'two', 'three']
        });
      });
  });

  it('can get a list of polls', () => {
    return request(app)
      .get('/')
      .then(res => res.body)
      .then(polls => {
        expect(polls).toHaveLength(100);
      });
  });
});
