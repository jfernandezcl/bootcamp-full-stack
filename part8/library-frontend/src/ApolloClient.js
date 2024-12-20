import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "subscriptions-transport-ws";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

// Crear el cliente de Apollo
const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export { client };
