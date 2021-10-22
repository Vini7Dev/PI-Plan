import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';

import GlobalStyles from './styles/global';

import AuthProvider from './contexts/AuthProvider';
import Routes from './routes';

Modal.setAppElement("#root");

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <GlobalStyles />
      </BrowserRouter>
    </div>
  );
};

export default App;
