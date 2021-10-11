import React from 'react';
import { FiUser } from 'react-icons/fi';

import { Container } from './styles';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <Container>
      <strong><FiUser size={25} color="#FFFFFF" /> User</strong>
      <h1>{title}</h1>
    </Container>
  );
}

export default Header;
