// src/screens/MyReviewsScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const MyReviewsScreen = () => {
  const [includeReviews, setIncludeReviews] = useState(true);  // Activar la carga de reseñas
  const { data, loading, error, fetchMore } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
  });

  useEffect(() => {
    if (data && data.me) {
      setIncludeReviews(true);  // Cargar reseñas si el usuario está autenticado
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

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error al cargar las reseñas.</Text>;

  const renderItem = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.username}>{item.node.repository.fullName}</Text>
      <Text>{item.node.text}</Text>
      <Text>Rating: {item.node.rating}</Text>
      <Text>Created at: {item.node.createdAt}</Text>
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
});

export default MyReviewsScreen;
