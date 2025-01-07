import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from '../components/RepositoryItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

const Repository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Error: {error.message}</Text></View>;

  const repository = data.repository;

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} showGitHubButton />
      <Button
        title="Open in GitHub"
        onPress={() => Linking.openURL(repository.url)}
      />
    </View>
  );
};

export default Repository;
