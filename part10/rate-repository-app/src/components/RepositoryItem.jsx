import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Picker } from 'react-native';
import useRepositories from '../hooks/useRepositories';  // Importamos el hook
import { useHistory } from 'react-router-native';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATEDAT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const { repositories, loading, error, refetch } = useRepositories(orderBy, orderDirection); // Se pasa el orden a nuestro hook
  const history = useHistory();

  const handlePress = (id) => {
    history.push(`/repository/${id}`); // Navegamos al repositorio seleccionado
  };

  // Lógica para manejar el cambio de selección del principio de ordenación
  const handleOrderChange = (selectedOrder) => {
    if (selectedOrder === 'latest') {
      setOrderBy('CREATEDAT');
      setOrderDirection('DESC');
    } else if (selectedOrder === 'topRated') {
      setOrderBy('RATINGAVERAGE');
      setOrderDirection('DESC');
    } else if (selectedOrder === 'lowestRated') {
      setOrderBy('RATINGAVERAGE');
      setOrderDirection('ASC');
    }
  };

  useEffect(() => {
    // Refetch para aplicar el nuevo orden cuando cambian los filtros
    refetch();
  }, [orderBy, orderDirection, refetch]);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar los repositorios.</Text>;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={orderBy === 'CREATEDAT' ? 'latest' : orderBy === 'RATINGAVERAGE' && orderDirection === 'DESC' ? 'topRated' : 'lowestRated'}
        onValueChange={handleOrderChange}
        style={styles.picker}
      >
        <Picker.Item label="Últimos repositorios" value="latest" />
        <Picker.Item label="Repositorios mejor calificados" value="topRated" />
        <Picker.Item label="Repositorios de menor calificación" value="lowestRated" />
      </Picker>

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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
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

