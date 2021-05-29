import React from 'react';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan.png';

const NavigationBar: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="pi-plan" />
    </Container>
  );
};

export default NavigationBar;
