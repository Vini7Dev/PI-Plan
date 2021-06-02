import React, { useState, useCallback } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan.png';

const NavigationBar: React.FC = () => {
  const [showNav, setShowNav] = useState(false);

  const handleChangeShowNav = useCallback(() => {
    setShowNav(!showNav)
  }, [showNav]);

  return (
    <Container showNav={showNav}>
      <img src={Logo} alt="pi-plan" />

      <button id="show-nav-button" onClick={handleChangeShowNav}>
        <FiMenu />
      </button>

      <div id="nav-links-list">
        <a href="/">Usuários</a>
        <a href="/">Clientes</a>
        <a href="/" id="nav-link-selected">Pedidos</a>
        <a href="/">Instalações</a>
        <a href="/">Portfólio</a>
      </div>
    </Container>
  );
};

export default NavigationBar;
