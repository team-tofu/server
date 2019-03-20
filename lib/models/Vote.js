const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  poll: {
    type: mongoose.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  optionChose: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
