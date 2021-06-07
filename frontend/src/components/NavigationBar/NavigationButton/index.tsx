import React, { AnchorHTMLAttributes } from 'react';
import { Container } from './styles';

interface INavigationButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  toPage?: string;
}

const NavigationButton: React.FC<INavigationButtonProps> = ({ text, toPage = '/', ...rest }) => {
  return (
    <Container href={toPage} {...rest}>
      {text}
    </Container>
  );
}

export default NavigationButton;
