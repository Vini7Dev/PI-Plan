import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Portfolio from '../pages/Portfolio';
import OrderData from '../pages/OrderData';
import OrdersList from '../pages/OrdersList';
import AssessmentsList from '../pages/AssessmentsList';

const AssemblerRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Portfolio} exact />
      <Route path="/portfolio-auth" component={Portfolio} />
      <Route path="/order-data" component={OrderData} />
      <Route path="/orders-list" component={OrdersList} />
      <Route path="/assessments-list" component={AssessmentsList} />
      <Redirect to="/" />
    </Switch>
  );
}

export default AssemblerRoutes;
