import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan_Ligth.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/admins/username/${username}`, true);

    request.onload = function(): void {
      if(this.response) {
        const user = JSON.parse(this.response);

        if(password === user.password) {
          history.push('/dashboard');
        } else {
          alert('Credenciais inválidas.');
        }
      } else {
        alert('Credenciais inválidas.');
      }
    }

    request.send();
  }, [history, username, password]);

  return (
    <Container>
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
    </Container>
  );
};

export default Login;
