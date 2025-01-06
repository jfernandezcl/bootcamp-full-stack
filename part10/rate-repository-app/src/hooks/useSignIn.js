import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import authStorage from '../utils/authStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data?.authorize?.accessToken) {
      await authStorage.setAccessToken(data.authorize.accessToken);
      await apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;

