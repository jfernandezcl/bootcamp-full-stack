import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from '../components/RepositoryItem';

const RepositoryList = ({ repositories }) => {
  const history = useHistory();

  const handlePress = (id) => {
    history.push(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default RepositoryList;
