import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  color?: 'brown' | 'white';
  hsize?: 'normal' | 'small';
}

const Input: React.FC<IInputProps> = ({
  label,
  color = 'brown',
  hsize = 'normal',
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <Container color={color} hsize={hsize}>
      <label htmlFor={label}>{label}</label>
      <input id={label} defaultValue={defaultValue} ref={inputRef}  {...rest} />
    </Container>
  );
};

export default Input;
