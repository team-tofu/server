const Poll = require('../lib/models/Poll');
const chance = require('chance').Chance();

function seedData(count = 100) {
  const pollToCreate = [...Array(count)].map(() => ({
    question: chance.sentence(),
    options: [chance.string(), chance.string(), chance.string()],
    email: chance.email()
  }));

  return Poll.create(pollToCreate);
}

module.exports = seedData;
