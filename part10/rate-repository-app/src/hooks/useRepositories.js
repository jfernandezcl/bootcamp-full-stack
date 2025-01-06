import { useQuery, gql } from '@apollo/client';

// Definir la consulta GraphQL
const GET_REPOSITORIES = gql`
  query {
    repositories {
      id
      name
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
    }
  }
`;

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',  // Usamos la política recomendada para evitar problemas de caché
  });

  // Verificamos si hubo un error o si los datos están cargando
  if (loading) return { loading: true };
  if (error) return { error: true };

  return { repositories: data.repositories };  // Retornamos los repositorios obtenidos
};

export default useRepositories;
