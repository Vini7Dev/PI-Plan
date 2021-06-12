import React, { useState, useCallback} from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const ClientData: React.FC = () =>{
  const [name, setName] = useState('');
  const [fone, setFone] = useState('');
  const [CPFCNPJ, setCPFCNPJ] = useState('');
  const [lastContact, setLastContact] = useState('');
  const [nextContact, setNextContact] = useState('');


  const handleClientData = useCallback(function(){
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/xxxx ${CPFCNPJ}`, true);







  },[name, fone, CPFCNPJ, lastContact, nextContact]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" />
          <NavigationButton text="Clientes" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Pedidos" toPage="/" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Cadastro de Cliente</h1>

          <Input
          label="Nome"
          placeholder="Digíte o Nome"
          onChange={(e) => setName(e.target.value)}
          />

          <Input
          label="Telefone"
          placeholder="Digíte o Telefone"
          onChange={(e) => setFone(e.target.value)}
          />

          <Input
          label="CPF/CNPJ"
          placeholder="Digíte o CPF / CNPJ"
          onChange={(e) => setCPFCNPJ(e.target.value)}
          />

          <h1>Alerta de Contato</h1>

          <ChechBox label="Emitir alerta para este Cliente"/>

          <Input
          label="Ultimo Contato"
          placeholder="Informe a data do Ultimo Contato"
          onChange={(e) => setLastContact(e.target.value)}
          />

          <Input
          label="Próximo Contato"
          placeholder="Informe a data do Próximo Contato"
          onChange={(e) => setNextContact(e.target.value)}
          />

          <Button name="Cadastrar" onClick={handleClientData} />
        </form>
      </main>
    </Container>
  );
};

export default ClientData;
