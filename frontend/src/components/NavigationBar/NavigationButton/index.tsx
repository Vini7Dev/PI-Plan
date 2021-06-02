import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface INavigationButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const NavigationButton: React.FC<INavigationButtonsProps> = ({ name }) => {
  return (
    <Container>
      {name}
    </Container>
  );
}

export default NavigationButton;
