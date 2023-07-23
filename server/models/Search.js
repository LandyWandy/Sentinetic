const { Schema, model } = require('mongoose');
const tweetSchema = require('./Tweet');

const searchSchema = new Schema({
  searchTerm: {
    type: String,
    required: true,
    maxLength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  tweets: [tweetSchema],
  positive: {
    type: Number,
    required: true,
  },
  negative: {
    type: Number,
    required: true,
  },
  neutral: {
    type: Number,
    required: true,
  }
});

const Search = model('Search', searchSchema);

module.exports = Search;