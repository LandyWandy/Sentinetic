const bcrypt = require('bcrypt');
const { authMiddleware, signToken } = require('../utils/auth')
const jwt = require('jsonwebtoken');
const runSentimentAnalysis = require("../services/sentAnalysis");
const { User, Search, Tweet } = require('../models');

const resolvers = {
  Query: {

// ------------------------- User Queries -------------------------

    user: async (parent, { id }) => {
      try {
        // Retrieve a specific user by ID
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
        // Retrieve all users
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


  searchesByTerm: async (parent, { searchTerm }, context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }

        // Retrieve a specific user by ID from context
        const user = await User.findById(context.user._id).populate({
          path: 'searches',
          populate: {
            path: 'tweets'
          }
        });
        
        if (!user) {
          throw new Error('User not found');
        }
        
        // Filter the user's searches by the searchTerm
        const matchingSearches = user.searches.filter(search => search.searchTerm === searchTerm);

        return matchingSearches;
      } catch (error) {
        console.error('Error fetching searches by term:', error);
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
        const token = signToken(user);
        return {user, token};
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

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    addSearch: async (parent, { searchTerm }, context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
    
        // Assuming the runSentimentAnalysis function returns an object containing
        // the sentiment counts (positive, negative, and neutral)
        const sentimentResults = await runSentimentAnalysis(searchTerm);
        // Store the search term in the database with the sentiment results
        const newSearch = await Search.create({
          searchTerm,
          ...sentimentResults,
          createdAt: new Date().toISOString()
        });
    
        // Add this search to their searches
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
  },
};



module.exports = resolvers;
