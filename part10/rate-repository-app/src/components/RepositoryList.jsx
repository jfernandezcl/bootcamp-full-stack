import React from 'react';
import RepositoryItem from './RepositoryItem';

const RepositoryList = ({ repositories }) => {
  return (
    <div style={style.container}>
      {repositories.map((repo) => (
        <RepositoryItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#e1e4e8',
    padding: '10px',
    minHeight: '100vh',
  },
};

export default RepositoryList;
