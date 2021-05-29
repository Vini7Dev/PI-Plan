import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<IInputProps> = ({ label, ...rest }) => {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <textarea id={label} {...rest} />
    </Container>
  );
};

export default Textarea;
