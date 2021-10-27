import React from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

import Input, { IInputProps } from '../Input';

interface ISearchBarButton extends IInputProps {
  onClickInSearchButton(): void;
}

const SearchBarButton: React.FC<ISearchBarButton> = ({
  label,
  color = 'brown',
  hsize = 'normal',
  onClickInSearchButton,
  ...rest
}) => {
  return (
    <Container color={color}>
      <Input label={label} color={color} hsize={hsize} {...rest} />
      <button onClick={onClickInSearchButton}>
        <FiSearch size={30} />
      </button>
    </Container>
  );
}

export default SearchBarButton;
