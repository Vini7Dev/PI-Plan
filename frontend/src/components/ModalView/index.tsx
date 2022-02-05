import React from 'react';
import Modal from 'react-modal';

import { Container } from './styles';

interface IModalViewProps {
  isOpen: boolean;
  title: string;
  zIndex?: number;
  size?: 'normal' | 'small';
}

// Componente de modal customizado
const ModalView: React.FC<IModalViewProps> = ({
  isOpen,
  title,
  zIndex = 1,
  size = 'normal',
  children
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          borderRadius: 30,
          padding: 20,
          width: size === 'normal' ? '65vw' : '40vw',
          height: size === 'normal' ? '87vh' : '40vh',
          marginRight: 'auto',
          marginLeft: 'auto',
        },
      }}
    >
      <Container size={size}>
        <h3>{title}</h3>

        <div id="modal-content-area">
          {children}
        </div>
      </Container>
    </Modal>
  );
}

export default ModalView;
