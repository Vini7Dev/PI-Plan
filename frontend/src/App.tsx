import React from 'react';
import GlobalStyles from './styles/global';

import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import AdmData from './pages/AdmData';
import AssemblerData from './pages/AssemblerData';
import UserList from './pages/UserList';
import ClientData from './pages/ClientData';
import ListClient from './pages/ClientList';
import OrderData from './pages/OrderData';
import OrdersList from './pages/OrdersList';

const App: React.FC = () => {
  return (
    <div className="App">
      <AdmData />
      <GlobalStyles />
    </div>
  );
};

export default App;
