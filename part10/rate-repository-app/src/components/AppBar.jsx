import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import Text from './Text';
import { ME } from '../graphql/queries';
import authStorage from '../utils/authStorage';

const AppBar = () => {
  // Consulta para verificar si el usuario está autenticado
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();

  // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    await authStorage.removeAccessToken(); // Elimina el token del almacenamiento
    await apolloClient.resetStore(); // Restablece la tienda de Apollo
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        {/* Enlace a la vista de repositorios */}
        <Link to="/" style={styles.link}>
          <Text color="white" fontWeight="bold">Repositories</Text>
        </Link>

        {/* Pestaña "Create a review" solo visible si el usuario ha iniciado sesión */}
        {data?.me && (
          <Link to="/create-review" style={styles.link}>
            <Text color="white" fontWeight="bold">Create a Review</Text>
          </Link>
        )}

        {/* Lógica para mostrar Sign In o Sign Out */}
        {data?.me ? (
          <Pressable onPress={handleSignOut} style={styles.link}>
            <Text color="white" fontWeight="bold">Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" style={styles.link}>
            <Text color="white" fontWeight="bold">Sign In</Text>
          </Link>
        )}

        {/* Pestañas adicionales */}
        <Link to="/about" style={styles.link}>
          <Text color="white" fontWeight="bold">About</Text>
        </Link>
        <Link to="/contact" style={styles.link}>
          <Text color="white" fontWeight="bold">Contact</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#24292e',
  },
  scrollView: {
    flexDirection: 'row',
  },
  link: {
    marginHorizontal: 10,
  },
});

export default AppBar;
