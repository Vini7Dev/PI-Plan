import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Portfolio from '../pages/Portfolio';
import DashBoard from '../pages/DashBoard';
import AdmData from '../pages/AdmData';
import AssemblerData from '../pages/AssemblerData';
import UsersList from '../pages/UsersList';
import CustomerData from '../pages/CustomerData';
import CustomersList from '../pages/CustomersList';
import OrderData from '../pages/OrderData';
import OrdersList from '../pages/OrdersList';
import AssessmentsList from '../pages/AssessmentsList';

const AdminRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Portfolio} exact />

      <Route path="/dashboard" component={DashBoard} />
      <Route path="/adm-data" component={AdmData} />
      <Route path="/assembler-data" component={AssemblerData} />
      <Route path="/users-list" component={UsersList} />
      <Route path="/customer-data" component={CustomerData} />
      <Route path="/customers-list" component={CustomersList} />

      <Route path="/order-data" component={OrderData} />
      <Route path="/orders-list" component={OrdersList} />
      <Route path="/assessments-list" component={AssessmentsList} />
      <Redirect to="/" />
    </Switch>
  );
}

export default AdminRoutes;
