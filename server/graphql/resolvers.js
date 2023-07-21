const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Search } = require('../models');

const resolvers = {
  Query: {

// ------------------------- User Queries -------------------------

    user: async (parent, { id }) => {
      try {
        // Retrieve a specific user by ID
        const user = await User.findById(id).populate('searches');
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    users: async () => {
      try {
        // Retrieve all users
        const users = await User.find().populate('searches');
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },

// ------------------------- Search Queries -------------------------

    searchResults: async () => {
      try {
        // Retrieve all search documents from the database
        const searchResults = await Search.find();
        return searchResults;
      } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
      }
    },
  },

  // ------------------------- Mutations -------------------------

  Mutation: {
    registerUser: async (parent, { email, password }) => {
      try {
        // Create a new user document
        const user = await User.create({ email, password, searches: [] });
        return user;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },
    loginUser: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ _id: user._id }, 'your_secret_key', { expiresIn: '2h' });
        return { token, user };
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
  },
};



module.exports = resolvers;
