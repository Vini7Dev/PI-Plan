import React from 'react';
import { FiLayers } from 'react-icons/fi';

import { Container } from './styles';

const ReminderItem: React.FC = () => {
  return (
    <Container>
      <FiLayers color="#A48760" size={35} />
      <strong>Título do Projeto</strong>
      <span>Modelagem</span>
      <p>
        Descrição e mais detalhes do projeto apresentado no card
      </p>
    </Container>
  );
}

export default ReminderItem;
