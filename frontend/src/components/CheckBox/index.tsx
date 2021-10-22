import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
  label?:string;
  onClickLabel?: (e: unknown) => unknown;
}

const ChechBox: React.FC<ICheckBoxProps> = ({label, onClickLabel, children, ...rest}) => {

  return(
    <Container>
      {label && <label htmlFor={label} onClick={onClickLabel}>{label}</label>}

      <input id={label} type="checkbox" {...rest} />
      <div>
        { children }
      </div>
    </Container>
  );
};

export default ChechBox;
