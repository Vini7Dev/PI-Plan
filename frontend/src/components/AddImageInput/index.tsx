import React from 'react';
import { FiImage } from 'react-icons/fi';

import { Container } from './styles';

const AddImageInput: React.FC = () => {
  return (
    <Container>
      <FiImage
        color="#ffffff"
        size={65}
      />
    </Container>
  );
}

export default AddImageInput;
