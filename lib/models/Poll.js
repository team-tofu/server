const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
