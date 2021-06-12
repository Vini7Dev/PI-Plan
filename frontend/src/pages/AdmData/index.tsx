import React, { useState, useCallback} from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SmallButton from '../../components/SmallButton';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const AdmData: React.FC = () =>{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAdmData = useCallback(function(){
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/xxxx ${username}`, true);







  },[name, username, password, confirmPassword]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/" />
          <NavigationButton text="Pedidos" toPage="/" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Cadastro de Administrador</h1>

          <div className="space-division">
              <SmallButton name="Administrador" backgorundcolor="beige"/>
              <SmallButton name="Montador" backgorundcolor="green"/>
          </div>

          <Input
          label="Nome"
          placeholder="Digíte o Nome"
          onChange={(e) => setName(e.target.value)}
          />

          <Input
          label="Usuário"
          placeholder="Digíte o Usuário"
          onChange={(e) => setUsername(e.target.value)}
          />

          <Input
          label="Senha"
          placeholder="Digíte a Senha"
          onChange={(e) => setPassword(e.target.value)}
          />

          <Input
          label="Confirme a Senha"
          placeholder="Digíte a Senha Novamente"
          onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <CheckBox label="Pode criar administrador" />

          <Button name="Cadastrar" onClick={handleAdmData} />
        </form>
      </main>
    </Container>
  );
};

export default AdmData;
