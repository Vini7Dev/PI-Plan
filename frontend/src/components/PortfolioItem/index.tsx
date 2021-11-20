import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Container } from './styles';

interface IPortfolioItemProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  adminAuthenticated?: boolean;
  onClickToEdit(id: string): void;
  onClickToDelete(id: string): void;
}

// Componente para apresentar um item cadastrado no portfólio
const PortfolioItem: React.FC<IPortfolioItemProps> = ({
  id,
  title,
  description,
  imageUrl,
  adminAuthenticated = false,
  onClickToEdit,
  onClickToDelete,
}) => {
  return (
    <Container imageUrl={imageUrl}>
      <button className="item-button" onClick={() => onClickToEdit(id)}>
        <div className="portfolio-item-content">
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </button>
      {
        adminAuthenticated &&
          <button className="remove-item-button" onClick={() => onClickToDelete(id)}>
            <FiTrash2 />
          </button>
      }
    </Container>
  );
};

export default PortfolioItem;
