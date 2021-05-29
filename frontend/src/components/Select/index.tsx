import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const Select: React.FC<IInputProps> = ({ label, options, ...rest }) => {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <select id={label} {...rest}>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
