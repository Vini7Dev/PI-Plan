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

const Select: React.FC<IInputProps> = ({ label, name, options, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <select id={label} {...rest}>
        {options.map(option => (
          <option
            value={option.value || option.description}
            key={option.value || option.description}
          >
            {option.description}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
