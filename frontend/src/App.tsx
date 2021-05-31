import React from 'react';
import GlobalStyles from './styles/global';

import OrderData from './pages/OrderData';
import RegisterAssembler from './pages/RegisterAssembler';
import RegisterAdm from './pages/RegisterAdm';
import RegisterClient from './pages/RegisterClient';

const App: React.FC = () => {
  return (
    <div className="App">
      <OrderData/>
      <GlobalStyles />
    </div>
  );
};

export default App;
