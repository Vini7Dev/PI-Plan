import React, { useState, useCallback, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

interface IClientProps{
  id?: number;
  warn_contact: boolean;
  name: string;
  cellphone: string;
  last_contact: string;
  next_contact: string;
  cpf?: string;
  cnpj?: string;
}

const ClientData: React.FC = () =>{
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [document, setDocument] = useState('');
  const [lastContact, setLastContact] = useState('');
  const [nextContact, setNextContact] = useState('');
  const [warnContact, setWarnContact] = useState(false);

  const loadLegalClientData = useCallback((clientId: string) => {
    const legalRequest = new XMLHttpRequest();

    legalRequest.open('GET', `http://localhost:8080/legalclients/${clientId}`, true);

    legalRequest.onload = function() {
      if(this.response) {
        const clientData = JSON.parse(this.response);

        if(clientData && clientData.cnpj) {
          const lastContactDate = clientData.last_contact.split(/t+/i)[0];
          const nextContactDate = clientData.next_contact.split(/t+/i)[0];


          setName(clientData.name);
          setCellphone(clientData.cellphone);
          setDocument(clientData.cnpj);
          setLastContact(lastContactDate);
          setNextContact(nextContactDate);
          setWarnContact(clientData.warn_contact);
        }
      }
    }
    legalRequest.send();
  }, []);

  const loadPhysicalClientData = useCallback((clientId: string) => {

    const physicalRequest = new XMLHttpRequest();

    physicalRequest.open('GET', `http://localhost:8080/physicalclients/${clientId}`, true);

    physicalRequest.onload = function() {
      if(this.response) {
        const clientData = JSON.parse(this.response);

        if(clientData && clientData.cpf) {
          const lastContactDate = clientData.last_contact.split(/t+/i)[0];
          const nextContactDate = clientData.next_contact.split(/t+/i)[0];

          setName(clientData.name);
          setCellphone(clientData.cellphone);
          setDocument(clientData.cpf);
          setLastContact(lastContactDate);
          setNextContact(nextContactDate);
          setWarnContact(clientData.warn_contact);
        }
      }
    }
    physicalRequest.send();
  }, []);

  useEffect(() => {
    const clientId = location.pathname.split('/client-data/')[1];

    if(clientId) {
      loadLegalClientData(clientId);
      loadPhysicalClientData(clientId);
    }

  }, [location, loadLegalClientData, loadPhysicalClientData]);

  const handleClientData = useCallback(function(){
    const clientId = location.pathname.split('/client-data/')[1];
    const request = new XMLHttpRequest();

    if(document.length > 11){
      const client = {
        name,
        cellphone,
        cnpj: document,
        last_contact: lastContact,
        next_contact: nextContact,
        warn_contact: warnContact,
      } as IClientProps;

      let httpVerb = '';
      if(clientId) {
        httpVerb = 'PUT';
        client.id = Number(clientId);
      } else {
        httpVerb = 'POST';
      }

      request.open(httpVerb, `http://localhost:8080/legalclients`, true);

      request.setRequestHeader(`Content-Type`, `application/json`);
      request.send(JSON.stringify(client));
    }
    else{
      const client = {
        name,
        cellphone,
        cpf: document,
        last_contact: lastContact,
        next_contact: nextContact,
        warn_contact: warnContact,
      }as IClientProps;

      let httpVerb = '';
      if(clientId) {
        httpVerb = 'PUT';
        client.id = Number(clientId);
      } else {
        httpVerb = 'POST';
      }

      request.open(httpVerb, `http://localhost:8080/physicalclients`, true);

      request.setRequestHeader(`Content-Type`, `application/json`);
      request.send(JSON.stringify(client));
    }

    alert('Sucesso!');
    history.push('/clients-list');
  },[name, cellphone, document, lastContact, nextContact, warnContact, location, history]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard" />
          <NavigationButton text="Usuários" toPage="/users-list"/>
          <NavigationButton text="Clientes" toPage="/clients-list" id="nav-link-selected" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Cadastro de Cliente</h1>

          <Input
          label="Nome"
          placeholder="Digíte o Nome"
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
          />

          <Input
          label="Telefone"
          placeholder="Digíte o Telefone"
          onChange={(e) => setCellphone(e.target.value)}
          defaultValue={cellphone}
          />

          <Input
          label="CPF/CNPJ"
          placeholder="Digíte o CPF / CNPJ"
          onChange={(e) => setDocument(e.target.value)}
          defaultValue={document}
          />

          <h1>Alerta de Contato</h1>

          <ChechBox
            label="Emitir alerta para este Cliente"
            onChange={(e) => setWarnContact(e.target.checked)}
            defaultChecked={warnContact}
          />

          <Input
          label="Ultimo Contato"
          placeholder="Informe a data do Ultimo Contato"
          type="date"
          onChange={(e) => setLastContact(e.target.value)}
          defaultValue={lastContact}
          />

          <Input
          label="Próximo Contato"
          placeholder="Informe a data do Próximo Contato"
          type="date"
          onChange={(e) => setNextContact(e.target.value)}
          defaultValue={nextContact}
          />

          <Button name="Cadastrar" onClick={handleClientData} />
        </form>
      </main>
    </Container>
  );
};

export default ClientData;
