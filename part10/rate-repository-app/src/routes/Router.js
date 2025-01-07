import React from 'react';
import { Route, Switch } from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import SingleRepository from './components/SingleRepository';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignUpForm';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={RepositoryList} />
    <Route path="/repository/:id" component={SingleRepository} />
    <Route path="/create-review" component={ReviewForm} />
    <Route exact path="/signup" component={SignUpForm} />
  </Switch>
);

export default Routes;
