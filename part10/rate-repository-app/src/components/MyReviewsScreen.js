// src/components/MyReviewsScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries'; // Consulta de usuario actual
import { DELETE_REVIEW } from '../graphql/mutations'; // Mutación de eliminación de reseña
import { useHistory } from 'react-router-native'; // Para navegación

const MyReviewsScreen = () => {
  const [includeReviews, setIncludeReviews] = useState(true);
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW); // Mutación para eliminar la reseña
  const history = useHistory(); // Para navegar a la vista del repositorio

  useEffect(() => {
    if (data && data.me) {
      setIncludeReviews(true);
    }
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (data?.me?.reviews?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.me.reviews.pageInfo.endCursor,
          includeReviews: true,
        },
      });
    }
  }, [data, fetchMore]);

  const handleDeleteReview = async (reviewId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta reseña?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              refetch(); // Refresca la lista de reseñas después de la eliminación
            } catch (error) {
              console.error('Error al eliminar la reseña:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleViewRepository = (repositoryId) => {
    history.push(`/repository/${repositoryId}`); // Redirige a la vista del repositorio
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error al cargar las reseñas.</Text>;

  const renderItem = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.username}>{item.node.repository.fullName}</Text>
      <Text>{item.node.text}</Text>
      <Text>Rating: {item.node.rating}</Text>
      <Text>Created at: {item.node.createdAt}</Text>

      <View style={styles.actions}>
        <Button
          title="Ver Repositorio"
          onPress={() => handleViewRepository(item.node.repository.id)} // Navega al repositorio
        />
        <Button
          title="Eliminar Reseña"
          onPress={() => handleDeleteReview(item.node.id)} // Elimina la reseña
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.me?.reviews?.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="small" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  review: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default MyReviewsScreen;
