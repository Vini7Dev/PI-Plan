import React from 'react';

import { Container } from './styles';

const PortfolioItem: React.FC = () => {
  return (
    <Container>
      <div className="portfolio-item-content">
        <strong>Cadeiras A. Lazer</strong>
        <p>Descrição simples do projeto...</p>
      </div>
    </Container>
  );
};

export default PortfolioItem;
