import React from 'react';
import Modal from 'react-modal';

import { Container } from './styles';

interface IModalViewProps {
  isOpen: boolean;
  title: string;
  zIndex?: number;
}

// Componente de modal customizado
const ModalView: React.FC<IModalViewProps> = ({
  isOpen,
  title,
  zIndex = 1,
  children
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex,
        },
        content: {
          borderRadius: 30,
          padding: 20,
          width: '65%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }
      }}
    >
      <Container>
        <h3>{title}</h3>

        <div id="modal-content-area">
          {children}
        </div>
      </Container>
    </Modal>
  );
}

export default ModalView;
