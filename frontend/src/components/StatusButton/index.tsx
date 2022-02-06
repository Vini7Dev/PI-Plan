import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

interface IStatusButtonProps {
  buttonText: string;
  buttonLink: string;
  statusMessage: string;
  statusColor: 'yellow' | 'green' | 'red';
}

// Componente do botão para alterar status de pedido e instalação
const StatusButton: React.FC<IStatusButtonProps> = ({
  buttonText, buttonLink, statusMessage, statusColor
}) => {
  const history = useHistory();

  // Função para redirecionar o usuário à um link quando clicar no botão
  const handleNavigateToButtonLink = useCallback(() => {
    history.push(buttonLink);
  }, []);

  return (
    <Container statusColor={statusColor}>
      <span>{statusMessage}</span>
      <div />
      <button type="button" onClick={handleNavigateToButtonLink}>{buttonText}</button>
    </Container>
  );
}

export default StatusButton;
