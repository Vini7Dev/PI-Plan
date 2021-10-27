import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
  label?:string;
  color?: 'brown' | 'black';
  onClickLabel?: (e: unknown) => unknown;
}

const ChechBox: React.FC<ICheckBoxProps> = ({
  label, color = 'brown', onClickLabel, children, ...rest
}) => {

  return(
    <Container color={color}>
      {label && <label htmlFor={label} onClick={onClickLabel}>{label}</label>}

      <input id={label} type="checkbox" {...rest} />
      <div>
        { children }
      </div>
    </Container>
  );
};

export default ChechBox;
