const { Schema, model } = require('mongoose');

// Define the Tweet schema
const tweetSchema = new Schema({
  text: {
    type: String,
    required: true, // The actual tweet content
  },
  createdAt: {
    type: String,
    required: true, // When the tweet was created
  },
  likes: {
    type: Number, // Number of likes on the tweet
  },
  retweets: {
    type: Number,
    required: true, // Number of retweets
  },
  comments: {
    type: Number,
    required: true, // Number of comments on the tweet
  },
});

const Tweet = model('Tweet', tweetSchema);

module.exports = tweetSchema;
