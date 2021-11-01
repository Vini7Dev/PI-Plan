import { useField } from '@unform/core';
import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { Container } from './styles';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

// Componente de textarea padrão
const Textarea: React.FC<ITextAreaProps> = ({ label, name, ...rest }) => {
  // Definindo uma referência ao input para a biblioteca unform
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Registrando o input para recuperar os seus dados posteriormente
  useEffect(() => {
    registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <Container inError={!!error}>
      <label htmlFor={label}>{label}</label>
      <textarea id={label} defaultValue={defaultValue} {...rest} />
      <span>{error}</span>
    </Container>
  );
};

export default Textarea;
