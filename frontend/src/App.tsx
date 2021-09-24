import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';

import GlobalStyles from './styles/global';

import Routes from './pages';

Modal.setAppElement("#root");

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
