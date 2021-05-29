import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<IInputProps> = ({ label, ...rest }) => {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...rest} />
    </Container>
  );
};

export default Input;
