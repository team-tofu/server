require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const seedData = require('../../tests/seedData');

const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

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
          email: '123456@email.com',
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

  it('can get a poll by id', () => {
    return request(app)
      .post('/')
      .send({
        question: 'Hello?',
        options: ['one', 'two', 'three'],
        email: 'newemail@email.com'
      })
      .then(postedPoll => {
        const id = postedPoll.body._id;
        return request(app)
          .get(`/${id}`)
          .then(res => {
            expect(res.body._id).toEqual(postedPoll.body._id);
          });
      });
  });
  it('can delete a poll by id', () => {
    return request (app)
      .post('/')
      .send({
        question: 'Hello?',
        options: ['one', 'two', 'three'],
        email: 'newemail@email.com'
      })
      .then(postedPoll => {
        return request (app)
          .delete(`/${postedPoll.body._id}`)  
          .then(res => {
            expect(res.body).toEqual(postedPoll.body);
          });
      });
  });
});


