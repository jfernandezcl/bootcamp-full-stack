import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native'; // Importamos Link
import Text from './Text'; // Importamos el componente Text

const AppBar = () => {
  return (
    <View style={styles.container}>
      {/* Enlace a la vista de repositorios */}
      <Link to="/" style={styles.link}>
        <Text color="white" fontWeight="bold">Repositories</Text>
      </Link>
      {/* Enlace a la vista de inicio de sesión */}
      <Link to="/signin" style={styles.link}>
        <Text color="white" fontWeight="bold">Sign In</Text>
      </Link>
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
  link: {
    marginHorizontal: 10,
  },
});

export default AppBar;
