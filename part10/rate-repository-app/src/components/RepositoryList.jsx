import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import useRepositories from '../hooks/useRepositories';  // Importamos el hook

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();  // Usamos el hook para obtener los repositorios

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar los repositorios.</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.repository}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.language}</Text>
              <Text>Forks: {item.forksCount}</Text>
              <Text>Stars: {item.stargazersCount}</Text>
              <Text>Rating: {item.ratingAverage}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  repository: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default RepositoryList;

