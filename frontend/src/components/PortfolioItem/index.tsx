import React from 'react';

import { Container } from './styles';

interface IPortfolioItemProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClickToEdit(id: string): void;
}

// Componente para apresentar um item cadastrado no portfólio
const PortfolioItem: React.FC<IPortfolioItemProps> = ({
  id,
  title,
  description,
  imageUrl,
  onClickToEdit,
}) => {
  return (
    <Container imageUrl={imageUrl}>
      <button onClick={() => onClickToEdit(id)}>
        <div className="portfolio-item-content">
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </button>
    </Container>
  );
};

export default PortfolioItem;
