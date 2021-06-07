import React from 'react';
import GlobalStyles from './styles/global';

import Login from './pages/Login';
import OrderData from './pages/OrderData';
import OrdersList from './pages/OrdersList';
import RegisterAssembler from './pages/RegisterAssembler';
import RegisterAdm from './pages/RegisterAdm';
import RegisterClient from './pages/RegisterClient';
import ListClient from './pages/ClientList';
import DashBoard from './pages/DashBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <DashBoard />
      <GlobalStyles />
    </div>
  );
};

export default App;
