import React, { useState, useCallback} from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const ClientData: React.FC = () =>{
  const [name, setName] = useState('');
  const [cellphone, setFone] = useState('');
  const [document, setDocument] = useState('');
  const [lastContact, setLastContact] = useState('');
  const [nextContact, setNextContact] = useState('');
  const [warnContact, setWarnContact] = useState(false);

  const handleClientData = useCallback(function(){
    const request = new XMLHttpRequest();

    request.open('POST', `http://localhost:8080/client`, true);

    if(document.length > 11){
      request.open('POST', `http://localhost:8080/legalclients`, true);
      const client = {
        name,
        cellphone,
        cnpj: document,
        last_contact: lastContact,
        next_contact: nextContact,
        warn_contact: warnContact,
      };

      request.setRequestHeader(`Content-Type`, `application/json`);
      request.send(JSON.stringify(client));
    }
    else{
      request.open('POST', `http://localhost:8080/physicalclients`, true);
      const client = {
        name,
        cellphone,
        cpf: document,
        last_contact: lastContact,
        next_contact: nextContact,
        warn_contact: warnContact,
      };

      request.setRequestHeader(`Content-Type`, `application/json`);
      request.send(JSON.stringify(client));
    }

    alert('Client cadastrado.');
  },[name, cellphone, document, lastContact, nextContact, warnContact]);

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
          onChange={(e) => setDocument(e.target.value)}
          />

          <h1>Alerta de Contato</h1>

          <ChechBox
            label="Emitir alerta para este Cliente"
            onChange={(e) => setWarnContact(e.target.checked)}
          />

          <Input
          label="Ultimo Contato"
          placeholder="Informe a data do Ultimo Contato"
          type="date"
          onChange={(e) => setLastContact(e.target.value)}
          />

          <Input
          label="Próximo Contato"
          placeholder="Informe a data do Próximo Contato"
          type="date"
          onChange={(e) => setNextContact(e.target.value)}
          />

          <Button name="Cadastrar" onClick={handleClientData} />
        </form>
      </main>
    </Container>
  );
};

export default ClientData;
