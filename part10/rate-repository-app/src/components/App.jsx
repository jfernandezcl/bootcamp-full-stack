import React, { useState } from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import AppBar from './components/AppBar'; // Importamos la barra de navegación
import RepositoryList from './components/RepositoryList'; // Importamos la lista de repositorios
import SignIn from './components/SignIn'; // Importamos el componente de inicio de sesión

const App = () => {
  // Estado para los repositorios
  const [repositories, setRepositories] = useState([
    {
      id: '1',
      name: 'jaredpalmer/formik',
      description: 'Build forms in React, without the tears',
      language: 'TypeScript',
      forksCount: 1589,
      stargazersCount: 21553,
      ratingAverage: 88,
      reviewCount: 4,
      ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4060187?v=4',
    },
    {
      id: '2',
      name: 'rails/rails',
      description: 'Ruby on Rails',
      language: 'Ruby',
      forksCount: 18349,
      stargazersCount: 45377,
      ratingAverage: 98,
      reviewCount: 5,
      ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4223?v=4',
    },
  ]);

  return (
    <NativeRouter>
      <View style={styles.container}>
        {/* Barra de navegación */}
        <AppBar />

        {/* Definición de las rutas */}
        <Routes>
          <Route path="/" element={<RepositoryList repositories={repositories} />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
