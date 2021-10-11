import React from 'react';

import { Container } from './styles';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <Container>
      <strong>User</strong>
      <h1>{title}</h1>
    </Container>
  );
}

export default Header;
