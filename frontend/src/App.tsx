import React from 'react';
import GlobalStyles from './styles/global';

import OrderData from './pages/OrderData';

const App: React.FC = () => {
  return (
    <div className="App">
      <OrderData />
      <GlobalStyles />
    </div>
  );
};

export default App;
