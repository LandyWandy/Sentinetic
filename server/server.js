// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import necessary dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Import custom authentication middleware
const { authMiddleware } = require('./utils/auth');

// GraphQL schema and resolver imports
const { typeDefs, resolvers } = require('./graphql');

// Database connection import
const db = require('./config/connection');

// Set the port for the server, defaulting to 3001
const PORT = process.env.PORT || 3001;
const app = express();

// Initialize Apollo server with GraphQL schema, resolvers and context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Use the authentication middleware to populate the context with user data
  context: ({ req }) => authMiddleware({ req }),
});

// Set up express app to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// If the app is in production mode, serve static files from the client's build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve the main index.html file for client-side routing in SPAs
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Asynchronous function to setup and start Apollo server and Express app
const startApolloServer = async () => {
  // Start the Apollo server
  await server.start();
  // Apply Apollo’s middleware to the Express app
  server.applyMiddleware({ app });
  
  // Connect to the database and then start the Express app
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to initiate the server
startApolloServer();
