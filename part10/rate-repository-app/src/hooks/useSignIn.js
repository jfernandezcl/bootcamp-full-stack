import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import authStorage from '../utils/authStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE); // Hook de mutación para autorizar al usuario

  // Función para manejar el inicio de sesión
  const signIn = async ({ username, password }) => {
    try {
      // Llamada a la mutación para autenticar al usuario
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      // Si el token de acceso es recibido, se almacena y se reinicia el store de Apollo
      if (data?.authorize?.accessToken) {
        await authStorage.setAccessToken(data.authorize.accessToken);
        await apolloClient.resetStore();
      }

      return data; // Retorna los datos de la mutación
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error en el proceso de inicio de sesión');
    }
  };

  return [signIn, result]; // Retorna la función de signIn y el resultado de la mutación
};

export default useSignIn;
