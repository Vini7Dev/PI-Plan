import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import DashBoard from './DashBoard';
import AdmData from './AdmData';
import AssemblerData from './AssemblerData';
import UserList from './UserList';
import ClientData from './ClientData';
import ClientList from './ClientList';
import OrderData from './OrderData';
import OrdersList from './OrdersList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/dashboard" component={DashBoard} exact />
      <Route path="/adm-data" component={AdmData} />
      <Route path="/assembler-data" component={AssemblerData} />
      <Route path="/users-list" component={UserList} exact />
      <Route path="/client-data" component={ClientData} />
      <Route path="/clients-list" component={ClientList} exact />
      <Route path="/order-data" component={OrderData} />
      <Route path="/orders-list" component={OrdersList} exact />
    </Switch>
  );
}

export default Routes;
