import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

import Routes from './pages';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
        <GlobalStyles />
      </BrowserRouter>
    </div>
  );
};

export default App;
