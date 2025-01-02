import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryList from './components/RepositoryList';

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default Main;
