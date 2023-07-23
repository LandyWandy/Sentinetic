const { Schema, model } = require('mongoose');

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  retweets: {
    type: Number,
    required: true,
  },
  comments: {
    type: Number,
    required: true,
  },
});

const Tweet = model('Tweet', tweetSchema);

module.exports = tweetSchema;