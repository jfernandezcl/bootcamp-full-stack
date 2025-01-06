import React, { useState } from 'react';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';

const App = () => {
  const [repositories, setRepositories] = useState([
    {
      id: '1',
      name: 'jaredpalmer/formik',
      description: 'Build forms in React, without the tears',
      language: 'TypeScript',
      forksCount: 1589,
      stargazersCount: 21553,
      ratingAverage: 88,
      reviewCount: 4,
      ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4060187?v=4',
    },
    {
      id: '2',
      name: 'rails/rails',
      description: 'Ruby on Rails',
      language: 'Ruby',
      forksCount: 18349,
      stargazersCount: 45377,
      ratingAverage: 98,
      reviewCount: 5,
      ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4223?v=4',
    },
  ]);

  return (
    <div>
      <AppBar />
      <RepositoryList repositories={repositories} />
    </div>
  );
};

export default App;
