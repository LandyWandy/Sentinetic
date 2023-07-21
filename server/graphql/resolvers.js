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
  },
};



module.exports = resolvers;
