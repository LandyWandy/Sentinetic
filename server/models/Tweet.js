const { Schema, model } = require('mongoose');

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
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

const User = model('Tweet', tweetSchema);

module.exports = User;