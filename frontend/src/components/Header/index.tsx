import React, { useCallback } from 'react';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../contexts/Authentication';

import { Container } from './styles';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title, children }) => {
  const { user, logout } = useAuth();

  const handleLogOut = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm('Deseja se desconectar?');

    if(response) {
      logout();
    }
  }, [logout]);

  return (
    <Container>
      <button onClick={handleLogOut} id="header-user-button">
        <strong><FiUser size={25} color="#FFFFFF" /> {user.name}</strong>
      </button>
      <h1>{title}</h1>
      <div>
        {children}
      </div>
    </Container>
  );
}

export default Header;
