const { Schema, model } = require('mongoose');
const tweetSchema = require('./Tweet');

// Define the Search schema
const searchSchema = new Schema({
  searchTerm: {
    type: String,
    required: true,
    maxLength: 100, // Maximum length of the search term
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current time
    required: true,
  },
  tweets: [tweetSchema], // An array of the tweets related to the search
  positive: {
    type: Number,
    required: true, // Count of positive sentiment tweets
  },
  negative: {
    type: Number,
    required: true, // Count of negative sentiment tweets
  },
  neutral: {
    type: Number,
    required: true, // Count of neutral sentiment tweets
  }
});

const Search = model('Search', searchSchema);

module.exports = Search;
