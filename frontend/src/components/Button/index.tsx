import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  size?: 'normal' | 'small';
  color?: 'green' | 'white';
}

const Button: React.FC<IButtonProps> = ({
  name,
  size = 'normal',
  color = 'green',
  type = 'button',
  ...rest
}) => {
  return (
    <Container
      size={size}
      color={color}
    >
      <button type={type} {...rest}>
        {name}
      </button>
    </Container>
  );
};

export default Button;
