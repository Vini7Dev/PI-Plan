import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  color?: 'brown' | 'white';
  hsize?: 'normal' | 'small';
}

// Componente padrão de input
const Input: React.FC<IInputProps> = ({
  label,
  name,
  color = 'brown',
  hsize = 'normal',
  ...rest
}) => {
  // Definindo uma referência ao input para a biblioteca unform
  const inputRef = useRef<HTMLInputElement>(null);
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
    <Container color={color} hsize={hsize} inError={!!error}>
      <label htmlFor={label}>{label}</label>
      <input id={label} defaultValue={defaultValue} ref={inputRef} {...rest} />
      <span>{error}</span>
    </Container>
  );
};

export default Input;
