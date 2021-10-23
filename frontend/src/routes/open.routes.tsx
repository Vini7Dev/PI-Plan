import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Portfolio from '../pages/Portfolio';
import Login from '../pages/Login';

const OpenRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Portfolio} exact />
      <Route path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
}

export default OpenRoutes;
