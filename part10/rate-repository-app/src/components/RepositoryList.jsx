import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import useRepositories from '../hooks/useRepositories';  // Importamos el hook
import { useHistory } from 'react-router-native';

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  const history = useHistory();

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar los repositorios.</Text>;

  const handlePress = (id) => {
    history.push(`/repository/${id}`); // Navegamos al repositorio seleccionado
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
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
          </TouchableOpacity>
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

