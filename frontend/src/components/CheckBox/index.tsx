import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
  label?:string;
  color?: 'brown' | 'black';
  onClickLabel?: (e: unknown) => unknown;
}

// Componente de input do tipo checkbox
const ChechBox: React.FC<ICheckBoxProps> = ({
  label, color = 'brown', onClickLabel, ...rest
}) => {

  return(
    <Container color={color}>
      {label && <label htmlFor={label} onClick={onClickLabel}>{label}</label>}

      <input id={label} type="checkbox" {...rest} />
    </Container>
  );
};

export default ChechBox;
