import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';

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
      <Form onSubmit={onClickInSearchButton}>
        <Input label={label} color={color} hsize={hsize} {...rest} />
        <button type="submit">
          <FiSearch size={30} />
        </button>
      </Form>
    </Container>
  );
}

export default SearchBarButton;
