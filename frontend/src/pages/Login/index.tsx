import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/Authentication';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan_Ligth.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      await login({
        username,
        password,
      });

      history.push('/dashboard');
    } catch(error) {
      alert('Credenciais inválidas!');
    }
  }, [username, password, login]);

  return (
    <Container>
      <div id="right-background-image-area">
        <main>
          <img src={Logo} alt="PI Plan" />

          <div id="title">
            <h2>Bem Vindo</h2>
            <h1>Login</h1>
          </div>

          <Input
            label="Usuario"
            placeholder="Informe o usuário"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Informe a senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button name="Entrar" onClick={handleLogin} />
        </main>
      </div>
    </Container>
  );
};

export default Login;
