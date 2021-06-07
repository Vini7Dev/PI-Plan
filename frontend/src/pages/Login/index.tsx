import React from 'react';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan_Ligth.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  return (
    <Container>
      <div>
        <img src={Logo} alt="PI Plan" />

        <h2>Bem Vindo</h2>
        <h1>Login</h1>

        <Input label="Usuario" placeholder="Informe o usuário" />
        <Input label="Senha" type="password" placeholder="Informe a senha" />

        <Button name="Entrar" />
      </div>
    </Container>
  );
};

export default Login;
