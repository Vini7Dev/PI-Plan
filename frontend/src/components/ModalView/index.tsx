import React from 'react';
import Modal from 'react-modal';

import { Container } from './styles';

interface IModalViewProps {
  isOpen: boolean;
  title: string;
}

const ModalView: React.FC<IModalViewProps> = ({
  isOpen,
  title,
  children
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex: 1,
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
        <h3>{ title }</h3>

        <div id="modal-content-area">
          { children }
        </div>
      </Container>
    </Modal>
  );
}

export default ModalView;
