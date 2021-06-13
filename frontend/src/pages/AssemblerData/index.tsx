import React, { useState, useCallback} from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SmallButton from '../../components/SmallButton';
import Button from '../../components/Button';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const AssemblerData: React.FC = () =>{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [fone, setFone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAssemblerData = useCallback(function(){
    const request = new XMLHttpRequest();

    request.open('POST', `http://localhost:8080/assembler`, true);

    if(password !== confirmPassword) {
      alert('Erro ao confirmar a senha.');
      return;
    }

    const assembler = {
      name,
      username,
      fone,
      password,
    };

    request.setRequestHeader(`Content-Type`, `application/json`);
    request.send(JSON.stringify(assembler));

    alert('Assembler cadastrado.');
  },[name, username, fone, password, confirmPassword]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard" />
          <NavigationButton text="Usuários" toPage="/users-list" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/clients-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Cadastro de Montador</h1>

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
          label="Telefone"
          placeholder="Digíte o Telefone"
          onChange={(e) => setFone(e.target.value)}
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

          <Button name="Cadastrar" onClick={handleAssemblerData} />
        </form>
      </main>
    </Container>
  );
};

export default AssemblerData;
