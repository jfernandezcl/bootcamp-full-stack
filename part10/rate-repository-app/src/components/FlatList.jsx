import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { useHistory } from 'react-router-native';
import { SEARCH_REPOSITORIES } from '../graphql/queries';  // Asegúrate de tener esta consulta definida

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);  // Aplica el debouncing con un retraso de 500ms
  const { data, loading, error } = useQuery(SEARCH_REPOSITORIES, {
    variables: { searchKeyword: debouncedSearchKeyword },
  });
  const history = useHistory();

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar los repositorios.</Text>;

  const handlePress = (id) => {
    history.push(`/repository/${id}`); // Navegar al repositorio seleccionado
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar repositorios..."
        value={searchKeyword}
        onChangeText={setSearchKeyword} // Actualiza el valor al escribir
      />
      <FlatList
        data={data.repositories.edges}
        keyExtractor={(item) => item.node.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Repositorios</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.node.id)}>
            <View style={styles.repository}>
              <Text style={styles.repositoryName}>{item.node.fullName}</Text>
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
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  repository: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RepositoryList;
