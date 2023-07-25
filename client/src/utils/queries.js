import { gql } from '@apollo/client';

export const GET_SEARCH = gql`
  query GetSearch($searchTerm: String!) {
    getSearch(searchTerm: $searchTerm) {
      _id
      searchTerm
      tweets {
        text
        createdAt
        likes
        retweets
        comments
      }
      positive
      negative
      neutral
    }
  }
`;

