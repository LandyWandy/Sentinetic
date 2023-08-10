const bcrypt = require('bcrypt');
const { authMiddleware, signToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const runSentimentAnalysis = require("../services/sentAnalysis");
const { User, Search, Tweet } = require('../models');

const resolvers = {
  Query: {
    // ========================= User Queries =========================
    user: async (parent, { id }) => {
      try {
        // Fetch a specific user by their ID, including their associated searches and tweets
        const user = await User.findById(id).populate({
          path: 'searches',
          populate: {
            path: 'tweets'
          }
        });
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },

    users: async () => {
      try {
        // Fetch all users, including their associated searches and tweets
        const users = await User.find().populate({
          path: 'searches',
          populate: {
            path: 'tweets'
          }
        });
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    // ========================= Search Queries =========================
    searchResults: async () => {
      try {
        // Fetch all search results from the database
        const searchResults = await Search.find();
        return searchResults;
      } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
      }
    },

    getSearch: async (parent, { searchTerm }) => {
      try {
        // Fetch a specific search by the provided searchTerm, including associated tweets
        const search = await Search.findOne({ searchTerm }).populate('tweets');
        return search;
      } catch (error) {
        console.error('Error fetching search:', error);
        throw error;
      }
    },
  },

  // ========================= Mutations =========================
  Mutation: {
    registerUser: async (parent, { email, password }) => {
      try {
        // Create a new user with the given email and password, and generate an auth token for them
        const user = await User.create({ email, password, searches: [] });
        const token = signToken(user);
        return { user, token };
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },

    loginUser: async (parent, { email, password }) => {
      try {
        // Find the user with the given email
        const user = await User.findOne({ email });

        // If the user isn't found or the password doesn't match, throw an error
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        // If everything checks out, sign a token for the user
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },

    addSearch: async (parent, { searchTerm }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user) throw new Error('Authentication required');

        // Get sentiment results for the provided searchTerm
        const sentimentResults = await runSentimentAnalysis(searchTerm);

        // Store the results, including the sentiment details, in the database
        const newSearch = await Search.create({
          searchTerm,
          ...sentimentResults,
          createdAt: new Date().toISOString()
        });

        // Add this new search to the user's search list
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { searches: newSearch._id } },
          { new: true }
        );

        return newSearch;
      } catch (error) {
        console.error('Error adding search:', error);
        throw error;
      }
    }
  }
};

module.exports = resolvers;
