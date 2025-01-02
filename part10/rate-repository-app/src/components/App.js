import React, { useState } from 'react';
import AppBar from './components/AppBar';  // Importar el componente AppBar
import RepositoryList from './components/RepositoryList';  // Importar el componente RepositoryList

const App = () => {
  const [repositories, setRepositories] = useState([
    { id: 1, name: 'Repository 1', description: 'This is the first repository' },
    { id: 2, name: 'Repository 2', description: 'This is the second repository' },
    { id: 3, name: 'Repository 3', description: 'This is the third repository' },
  ]);

  return (
    <div>
      <AppBar />  {/* Mostrar la barra de aplicaciones */}
      <RepositoryList repositories={repositories} />  {/* Mostrar la lista de repositorios */}
    </div>
  );
};

export default App;
