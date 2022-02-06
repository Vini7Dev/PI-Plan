import React, { useEffect, useState } from 'react';

import { Container } from './styles';

const Loading: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState('Carregando...');

  useEffect(() => {
    setTimeout(() => {
      switch (loadingMessage) {
        case 'Carregando.':
          setLoadingMessage('Carregando..');
          break;
        case 'Carregando..':
          setLoadingMessage('Carregando...');
          break;
        case 'Carregando...':
          setLoadingMessage('Carregando.');
          break;
        default:
          setLoadingMessage('Carregando.');
      }
    }, 500);
  }, [loadingMessage]);

  return (
    <Container>
      <span>{loadingMessage}</span>
    </Container>
  )
}

export default Loading;
