import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

// Obtenemos la URL de Apollo Server desde las variables de entorno
const { apolloUri } = Constants.manifest.extra;

const client = new ApolloClient({
  uri: apolloUri, // Usamos la URL obtenida del objeto extra
  cache: new InMemoryCache(),
});

export default client;
