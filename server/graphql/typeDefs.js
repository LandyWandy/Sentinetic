const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    searches: [Search]!
  }

  type Search {
    _id: ID
    searchTerm: String
    createdAt: String
    positive: Int
    neutral: Int
    negative: Int
  }
`;

module.exports = typeDefs;
