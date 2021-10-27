import React, { useCallback } from 'react';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../contexts/Authentication';

import { Container } from './styles';

interface IHeaderProps {
  title: string;
}

// Componente de cabeçalho das páginas
const Header: React.FC<IHeaderProps> = ({ title, children }) => {
  const { user, logout } = useAuth();

  // Função para desconectar o usuário do sistema
  const handleLogOut = useCallback(() => {
    // Confirmando se o usuário deseja realmente se desconectar
    const response = confirm('Deseja se desconectar?');

    // Caso sim, executando a função para desconectar o usuário do sistema
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
