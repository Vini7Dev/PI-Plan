import React, { useState, useCallback } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Container } from './styles';

import { useAuth } from '../../contexts/Authentication';
import Logo from '../../assets/images/PI_Plan.png';
import NavigationButton from './NavigationButton';

interface INavigationBarProps {
  optionSelected: number;
}

// Opições de navegação
const navigationOptions = [
  { id: 0, text: 'Página Inicial', toPage: '/dashboard', isAdmin: true },
  { id: 1, text: 'Usuários', toPage: '/users-list', isAdmin: true },
  { id: 2, text: 'Clientes', toPage: '/customers-list', isAdmin: true },
  { id: 3, text: 'Pedidos', toPage: '/orders-list', isAdmin: false },
  { id: 4, text: 'Instalações', toPage: '/installations-list', isAdmin: false },
  { id: 5, text: 'Avaliações', toPage: '/assessments-list', isAdmin: false },
  { id: 6, text: 'Portfólio', toPage: '/', isAdmin: false },
];

// Componente da barra de navegação
const NavigationBar: React.FC<INavigationBarProps> = ({ optionSelected }) => {
  const { user } = useAuth();
  const [showNav, setShowNav] = useState(false);

  // Para o mobile, atualizando a variável para mostrar ou esconder os botões de navegação
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
        {/** Percorrendo as opções de navegação e renderizando-as */}
        {navigationOptions.map(option => (
          !option.isAdmin || user.user_type === 'admin'
          ? (<NavigationButton
              key={option.id}
              text={option.text}
              toPage={option.toPage}
              id={optionSelected === option.id ? 'nav-link-selected' : undefined}
          />)
          : null
        ))}
      </div>
    </Container>
  );
};

export default NavigationBar;
