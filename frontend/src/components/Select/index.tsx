import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface IOptionProps {
  value?: number | string;
  description: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: IOptionProps[];
}

const Select: React.FC<IInputProps> = ({ label, options, ...rest }) => {
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
