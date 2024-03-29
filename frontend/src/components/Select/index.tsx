import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { Container } from './styles';

interface IOptionProps {
  value?: number | string;
  description: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: IOptionProps[];
}

// Componente de select
const Select: React.FC<IInputProps> = ({
  label,
  name,
  options,
  ...rest
}) => {
  // Definindo uma referência ao input para a biblioteca unform
  const inputRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Registrando o input para recuperar os seus dados posteriormente
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container inError={!!error}>
      <label htmlFor={label}>{label}</label>
      <select id={label} ref={inputRef} defaultValue={defaultValue} {...rest}>
        {options.map(option => (
          <option
            value={option.value || option.description}
            key={option.value || (option.description + Math.random())}
          >
            {option.description}
          </option>
        ))}
      </select>
      <span>{error}</span>
    </Container>
  );
};

export default Select;
