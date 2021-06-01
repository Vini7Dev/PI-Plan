import React, { ButtonHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

const SearchButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ type = 'button', ...rest }) => {
  return (
    <Container>
      <button type={type} {...rest}>
        <FiSearch />
      </button>
    </Container>
  );
};

export default SearchButton;
