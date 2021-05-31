import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
  label:string;
}

const ChechBox: React.FC<ICheckBoxProps> = ({label, ...rest}) => {

  return(
    <Container>
      <label htmlFor={label}>{label}</label>
      <input id={label} type="checkbox" {...rest} />
    </Container>
  );
};

export default ChechBox;
