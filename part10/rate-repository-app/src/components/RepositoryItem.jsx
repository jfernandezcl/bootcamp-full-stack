import React from 'react';

const RepositoryItem = ({ repo }) => {
  return (
    <div>
      <h3>{repo.name}</h3>  {/* Mostrar el nombre del repositorio */}
      <p>{repo.description}</p>  {/* Mostrar la descripción del repositorio */}
    </div>
  );
};

export default RepositoryItem;
