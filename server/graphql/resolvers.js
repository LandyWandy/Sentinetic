const { User, Search } = require('../models');

const resolvers = {
  Query: {
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
  },
};

module.exports = resolvers;
