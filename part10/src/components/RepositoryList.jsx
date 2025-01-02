import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
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
  description: {
    color: '#777',
  },
  language: {
    fontStyle: 'italic',
  },
});

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
      <Text style={styles.fullName}>{repository.fullName}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <Text style={styles.language}>Language: {repository.language}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Rating: {repository.ratingAverage}%</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
    </View>
  );
};

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
