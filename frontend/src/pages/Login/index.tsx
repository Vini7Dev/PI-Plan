import React, { useCallback } from 'react';
import { Form } from '@unform/web';

import { useAuth } from '../../contexts/Authentication';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan_Ligth.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

// Página de login do sistema
const Login: React.FC = () => {
  const { login } = useAuth();

  // Função para realizar o login no sistema
  const handleLogin = useCallback(async (data) => {
    try {
      // Executando a função para iniciar a sessão enviando o username e password obtidos no formulário
      await login({
        username: data.username,
        password: data.password,
      });
    } catch(error) {
      // Caso de erro, informar que as credenciais estão inválidas
      alert('Credenciais inválidas!');
    }
  }, [login]);

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
