import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './style';

interface ISmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  backgorundcolor: 'green' | 'beige';
}

const SmallButton: React.FC<ISmallButtonProps> = ({ name, type = 'button', backgorundcolor, ...rest }) => {
  return (
    <div>
      <Container backgroundcolor= {backgorundcolor}>
        <button type={type} {...rest}>
          {name}
        </button>
      </Container>
  </div>
  );
};

export default SmallButton;
