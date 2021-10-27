import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import { useAuth } from '../../contexts/Authentication';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan_Ligth.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();

  const handleLogin = useCallback(async (data) => {
    try {
      await login({
        username: data.username,
        password: data.password,
      });

      history.push('/dashboard');
    } catch(error) {
      alert('Credenciais inválidas!');
    }
  }, [login, history]);

  return (
    <Container>
      <div id="right-background-image-area">
        <main>
          <img src={Logo} alt="PI Plan" />

          <div id="title">
            <h2>Bem Vindo</h2>
            <h1>Login</h1>
          </div>

          <Form
            onSubmit={handleLogin}
          >
            <Input
              label="Usuario"
              name="username"
              placeholder="Informe o usuário"
              autoFocus
            />

            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="Informe a senha"
            />

            <Button name="Entrar" type="submit" />
          </Form>
        </main>
      </div>
    </Container>
  );
};

export default Login;
