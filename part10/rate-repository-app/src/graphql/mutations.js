// src/graphql/mutations.js

import { gql } from '@apollo/client';

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
      repository {
        id
        fullName
      }
    }
  }
`;
