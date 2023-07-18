const { Schema, model } = require('mongoose');

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
  positive: {
    type: Number,
    required: true,
  },
  neutral: {
    type: Number,
    required: true,
  },
  negative: {
    type: Number,
    required: true,
  }
});

const User = model('Search', searchSchema);

module.exports = User;