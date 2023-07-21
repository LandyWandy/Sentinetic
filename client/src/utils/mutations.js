import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      _id
      email
      password
      searches {
        _id
        searchTerm
        createdAt
        positive
        neutral
        negative
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        searches {
          _id
          searchTerm
          createdAt
          positive
          neutral
          negative
        }
      }
    }
  }
`;