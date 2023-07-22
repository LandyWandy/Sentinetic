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
    negative: Int
    neutral: Int
  }

  type Tweet {
    text: String
    createdAt: String
    likes: Int
    retweets: Int
    comments: Int
  }

  type Query {
    searchResults: [Search]
    user(id: ID!): User
    users: [User]
    searchesByTerm(searchTerm: String!): [Search]
  }

  type Mutation {
    registerUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): AuthData
    addSearch(searchTerm: String!): Search
  }
  
  type AuthData {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
