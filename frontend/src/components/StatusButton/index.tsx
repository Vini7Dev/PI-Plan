import React from 'react';

import { Container } from './styles';

const StatusButton: React.FC = () => {
  return (
    <Container>
      <span>Em Andamento</span>
      <div />
      <button type="button">Cancelar Pedido</button>
    </Container>
  );
}

export default StatusButton;
