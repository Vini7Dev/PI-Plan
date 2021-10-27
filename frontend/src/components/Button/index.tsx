import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  size?: 'normal' | 'small';
  color?: 'green' | 'white' | 'brown';
  active?: boolean;
}

// Componente padrão de botão
const Button: React.FC<IButtonProps> = ({
  name,
  size = 'normal',
  color = 'green',
  type = 'button',
  active = true,
  ...rest
}) => {
  return (
    <Container
      size={size}
      color={color}
      active={active}
    >
      <button type={type} {...rest}>
        {name}
      </button>
    </Container>
  );
};

export default Button;
