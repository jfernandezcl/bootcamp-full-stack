import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import SingleRepository from './components/SingleRepository';

const App = () => {
  return (
    <NativeRouter>
      <Switch>
        <Route path="/" exact component={RepositoryList} />
        <Route path="/repository/:id" component={SingleRepository} />
      </Switch>
    </NativeRouter>
  );
};

export default App;
