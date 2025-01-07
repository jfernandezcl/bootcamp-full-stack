import { NativeRouter, Route, Switch } from 'react-router-native';
import Repository from '../pages/Repository';
import RepositoryList from '../pages/RepositoryList';

const Router = () => (
  <NativeRouter>
    <Switch>
      <Route path="/" exact component={RepositoryList} />
      <Route path="/repository/:id" component={Repository} />
    </Switch>
  </NativeRouter>
);

export default Router;
