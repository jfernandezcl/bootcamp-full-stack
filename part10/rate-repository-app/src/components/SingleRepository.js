import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { GET_REPOSITORY } from '../graphql/queries';

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return null;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repo={repository} showGitHubButton />}
      ItemSeparatorComponent={() => <Text style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default SingleRepository;
