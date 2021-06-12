import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
  label:string;
  onClickLabel?: (e: unknown) => unknown;
}

const ChechBox: React.FC<ICheckBoxProps> = ({label, onClickLabel, ...rest}) => {

  return(
    <Container>
      <label htmlFor={label} onClick={onClickLabel}>{label}</label>
      <input id={label} type="checkbox" {...rest} />
    </Container>
  );
};

export default ChechBox;
