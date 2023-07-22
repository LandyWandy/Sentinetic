import { gql } from '@apollo/client';

export const SEARCHES_BY_TERM_QUERY = gql`
  query SearchesByTerm($searchTerm: String!) {
    searchesByTerm(searchTerm: $searchTerm) {
      positive
      negative
      neutral
    }
  }
`;
