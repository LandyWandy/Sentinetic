const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String
    password: String
    searches: [Search]!
  }

  type Search {
    _id: ID
    searchTerm: String
    createdAt: String
    tweets: [Tweet]
    positive: Int
    neutral: Int
    negative: Int
  }

  

  type Query {
    searchResults: [Search]
    user(id: ID!): User
    users: [User]
  }
`;

module.exports = typeDefs;
