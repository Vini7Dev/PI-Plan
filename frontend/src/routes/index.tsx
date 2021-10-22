import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
import AssessmentsList from '../pages/AssessmentsList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Portfolio} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/dashboard" component={DashBoard} exact />
      <Route path="/adm-data" component={AdmData} />
      <Route path="/assembler-data" component={AssemblerData} />
      <Route path="/users-list" component={UsersList} exact />
      <Route path="/customer-data" component={CustomerData} />
      <Route path="/customers-list" component={CustomersList} exact />
      <Route path="/order-data" component={OrderData} />
      <Route path="/orders-list" component={OrdersList} exact />
      <Route path="/assessments-list" component={AssessmentsList} exact />
    </Switch>
  );
}

export default Routes;
