const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email is unique
  },
  password: {
    type: String,
    required: true,
  },
  // Array of references to the searches a user has performed
  searches: [
    { type: Schema.Types.ObjectId, ref: 'Search' }
  ]
});

// Middleware to hash the password before saving a user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10; // Number of salt rounds for bcrypt to use
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = model('User', userSchema);

module.exports = User;
