import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';

// Definimos la mutación `authorize`
const AUTHORIZE_MUTATION = gql`
  mutation Authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE_MUTATION);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password },
        },
      });
      return data;
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
