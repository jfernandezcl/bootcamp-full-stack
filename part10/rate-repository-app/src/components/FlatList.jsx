import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';  // Asegúrate de tener esta consulta

const ReviewList = ({ repositoryId }) => {
  const [after, setAfter] = useState(null);
  const { data, loading, error, fetchMore } = useQuery(GET_REVIEWS, {
    variables: {
      repositoryId,
      first: 10,  // Número inicial de reseñas
      after,
    },
  });

  const handleEndReached = useCallback(() => {
    if (data?.repository?.reviews?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
        },
      }).then(() => {
        setAfter(data.repository.reviews.pageInfo.endCursor);
      });
    }
  }, [data, fetchMore]);

  if (loading && !data) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error al cargar las reseñas.</Text>;

  const renderItem = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.username}>{item.node.user.username}</Text>
      <Text>{item.node.text}</Text>
      <Text>Rating: {item.node.rating}</Text>
      <Text>Created at: {item.node.createdAt}</Text>
    </View>
  );

  return (
    <FlatList
      data={data.repository.reviews.edges}
      keyExtractor={(item) => item.node.id}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}  // Carga más reseñas cuando esté cerca del final
      ListFooterComponent={loading && <ActivityIndicator size="small" />}
    />
  );
};

const styles = StyleSheet.create({
  review: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontWeight: 'bold',
  },
});

export default ReviewList;
