import React from 'react';
import { Route, Switch } from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import SingleRepository from './components/SingleRepository';
import ReviewForm from './components/ReviewForm';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={RepositoryList} />
    <Route path="/repository/:id" component={SingleRepository} />
    <Route path="/create-review" component={ReviewForm} />
  </Switch>
);

export default Routes;
