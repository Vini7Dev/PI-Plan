import React from 'react';

import { Container } from './styles';

interface IStatusButtonProps {
  buttonText: string;
  buttonColor: 'red' | 'green';
  status: string;
}

// Componente do botão para alterar status de pedido e instalação
const StatusButton: React.FC<IStatusButtonProps> = ({
  buttonText, buttonColor, status
}) => {
  return (
    <Container buttonColor={buttonColor}>
      <span>{status}</span>
      <div />
      <button type="button">{buttonText}</button>
    </Container>
  );
}

export default StatusButton;
