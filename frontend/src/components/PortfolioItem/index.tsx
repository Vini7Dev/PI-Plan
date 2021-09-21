import React from 'react';

import { Container } from './styles';

interface IPortfolioItemProps {
  id: string;
  title: string;
  description?: string;
}

const PortfolioItem: React.FC<IPortfolioItemProps> = ({
  id,
  title,
  description,
}) => {
  return (
    <Container>
      <button>
        <div className="portfolio-item-content">
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </button>
    </Container>
  );
};

export default PortfolioItem;
