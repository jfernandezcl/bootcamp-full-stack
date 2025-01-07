import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RepositoryItem = ({ repo, showGitHubButton }) => {
  const formatCount = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <img src={repo.ownerAvatarUrl} alt="Owner avatar" style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>{repo.name}</Text>
          <Text style={styles.description}>{repo.description}</Text>
          <Text style={styles.language}>{repo.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text>{formatCount(repo.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text>{formatCount(repo.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text>{repo.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text>{repo.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {showGitHubButton && (
        <Button
          title="Open in GitHub"
          onPress={() => Linking.openURL(repo.url)}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#586069',
    marginBottom: 10,
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
};

export default RepositoryItem;

