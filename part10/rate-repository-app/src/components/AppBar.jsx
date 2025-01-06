import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native'; // Importamos Link
import Text from './Text'; // Importamos el componente Text

const AppBar = () => {
  return (
    <View style={styles.container}>
      {/* Componente ScrollView para el desplazamiento horizontal */}
      <ScrollView horizontal style={styles.scrollView}>
        {/* Enlace a la vista de repositorios */}
        <Link to="/" style={styles.link}>
          <Text color="white" fontWeight="bold">Repositories</Text>
        </Link>
        {/* Enlace a la vista de inicio de sesión */}
        <Link to="/signin" style={styles.link}>
          <Text color="white" fontWeight="bold">Sign In</Text>
        </Link>
        {/* Agregar más pestañas de ejemplo */}
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
    flexDirection: 'row', // Asegura que las pestañas estén en fila
  },
  link: {
    marginHorizontal: 10,
  },
});

export default AppBar;

