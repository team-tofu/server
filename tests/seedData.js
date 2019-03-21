const chance = require('chance').Chance();
const Poll = require('../lib/models/Poll');
const Vote = require('../lib/models/Vote');

const createPolls = totalPolls => {
  const pollToCreate = {
    question: chance.sentence(),
    options: [chance.string(), chance.string(), chance.string()],
    email: chance.email()
  };

  return Promise.all([...Array(totalPolls)].map(() => Poll.create(pollToCreate)));
};

const createVotes = (totalPolls, totalVotes) => {
  return createPolls(totalPolls)
    .then(polls => {
      const voteToCreate = {
        poll: chance.pickone(polls)._id,
        optionChose: chance.integer({ min: 0, max: polls.length - 1 }),
        email: chance.pickone(polls).toJSON().email
      };
      
      return Promise.all([...Array(totalVotes)].map(() => Vote.create(voteToCreate)));
    });
  
};

module.exports = (totalPolls = 50, totalVotes = 50) => createVotes(totalPolls, totalVotes);
