import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/cadastro" exact component={SignUp} />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
