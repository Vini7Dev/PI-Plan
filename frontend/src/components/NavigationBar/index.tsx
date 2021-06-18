import React, { useState, useCallback } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan.png';

const NavigationBar: React.FC = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const handleChangeShowNav = useCallback(() => {
    setShowNav(!showNav)
  }, [showNav]);

  return (
    <Container showNav={showNav}>
      { /* OBS: O componente "NavigationBar" é um "nav" definido no arquivo de estilização */ }
      <img src={Logo} alt="pi-plan" />

      <button id="show-nav-button" onClick={handleChangeShowNav}>
        <FiMenu />
      </button>

      <div id="nav-links-list">
        {children}
      </div>
    </Container>
  );
};

export default NavigationBar;
