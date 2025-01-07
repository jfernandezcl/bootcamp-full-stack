import { gql } from '@apollo/client';

export const REPOSITORIES = gql`
  query Repositories($orderBy: RepositoryOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      name
      ownerName
      ratingAverage
      reviewCount
      createdAt
    }
  }
`;
