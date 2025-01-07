import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { REPOSITORIES } from '../graphql/queries';  // La consulta GraphQL para obtener repositorios

const useRepositories = (orderBy, orderDirection) => {
  const { data, loading, error, refetch } = useQuery(REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
    },
  });

  return {
    repositories: data ? data.repositories : [],
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
