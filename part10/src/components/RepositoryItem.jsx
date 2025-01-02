import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
      <Text style={styles.fullName}>{repository.fullName}</Text>
      <Text>{repository.description}</Text>
      <Text>Language: {repository.language}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Rating: {repository.ratingAverage}%</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  fullName: {
    fontWeight: 'bold',
  },
});

export default RepositoryItem;
