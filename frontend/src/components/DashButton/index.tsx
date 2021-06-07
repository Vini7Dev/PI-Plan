import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const DashButton: React.FC<IButtonProps> = ({ name, type = 'button', ...rest }) => {
  return (
    <Container>
      <button type={type} {...rest}>
        {name}
      </button>
    </Container>
  );
};

export default DashButton;
