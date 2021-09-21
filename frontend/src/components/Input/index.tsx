import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: 'brown' | 'white';
  hsize?: 'normal' | 'small';
}

const Input: React.FC<IInputProps> = ({
  label,
  color = 'brown',
  hsize = 'normal',
  ...rest
}) => {
  return (
    <Container color={color} hsize={hsize}>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...rest} />
    </Container>
  );
};

export default Input;
