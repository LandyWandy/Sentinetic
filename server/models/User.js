const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // if we get to it
    },
  },
  password: {
    type: String,
    required: true,
  },
  searches: [
    { type: Schema.Types.ObjectId, ref: 'Search' }
  ]
});

const User = model('User', userSchema);

module.exports = User;