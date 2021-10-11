import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Portfolio from './Portfolio';
import Login from './Login';
import DashBoard from './DashBoard';
import AdmData from './AdmData';
import UsersList from './UsersList';
import CustomerData from './CustomerData';
import CustomersList from './CustomersList';
import OrderData from './OrderData';
import OrdersList from './OrdersList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Portfolio} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/dashboard" component={DashBoard} exact />
      <Route path="/adm-data" component={AdmData} />
      <Route path="/users-list" component={UsersList} exact />
      <Route path="/customer-data" component={CustomerData} />
      <Route path="/customers-list" component={CustomersList} exact />
      <Route path="/order-data" component={OrderData} />
      <Route path="/orders-list" component={OrdersList} exact />
    </Switch>
  );
}

export default Routes;
