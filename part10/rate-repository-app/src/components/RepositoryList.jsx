import React from 'react';
import RepositoryItem from './RepositoryItem';  // Importar el componente RepositoryItem

const RepositoryList = ({ repositories }) => {
  return (
    <div>
      {repositories.map(repo => (
        <RepositoryItem key={repo.id} repo={repo} />  // Usar RepositoryItem para mostrar los repositorios
      ))}
    </div>
  );
};

export default RepositoryList;
