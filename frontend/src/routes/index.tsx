import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AdminRoute, AuthRoute } from './MyRoutes';

import Portfolio from '../pages/Portfolio';
import Login from '../pages/Login';
import DashBoard from '../pages/DashBoard';
import AdmData from '../pages/AdmData';
import AssemblerData from '../pages/AssemblerData';
import UsersList from '../pages/UsersList';
import CustomerData from '../pages/CustomerData';
import CustomersList from '../pages/CustomersList';
import OrderData from '../pages/OrderData';
import OrdersList from '../pages/OrdersList';
import InstallationsList from '../pages/InstallationsList';
import AssessmentsList from '../pages/AssessmentsList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Portfolio} exact />
      <Route path="/login" component={Login} />

      <AdminRoute path="/dashboard" component={DashBoard} />
      <AdminRoute path="/adm-data" component={AdmData} />
      <AdminRoute path="/assembler-data" component={AssemblerData} />
      <AdminRoute path="/users-list" component={UsersList} />
      <AdminRoute path="/customer-data" component={CustomerData} />
      <AdminRoute path="/customers-list" component={CustomersList} />

      <AuthRoute path="/order-data" component={OrderData} />
      <AuthRoute path="/orders-list" component={OrdersList} />
      <AuthRoute path="/installations-list" component={InstallationsList} />
      <AuthRoute path="/assessments-list" component={AssessmentsList} />
    </Switch>
  );
};

export default Routes;
