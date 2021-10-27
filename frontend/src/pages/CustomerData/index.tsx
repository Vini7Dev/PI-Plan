import React, { useState, useCallback, useEffect} from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import Header from '../../components/Header';

interface ICustomerProps{
  id?: number;
  warn_contact: boolean;
  name: string;
  cellphone: string;
  last_contact: string;
  next_contact: string;
  cpf?: string;
  cnpj?: string;
}

const CustomerData: React.FC = () =>{
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
      } as ICustomerProps;

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
      }as ICustomerProps;

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
        <NavigationBar optionSelected={2} />
      </div>

      <main>
        <section id="form-area">
          <Header title="Cadastro de Cliente" />

          <Form onSubmit={handleClientData}>
            <Input
            label="Nome"
            name="name"
            placeholder="Digíte o Nome"
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            />

            <Input
            label="Telefone"
            name="cellphone"
            placeholder="Digíte o Telefone"
            onChange={(e) => setCellphone(e.target.value)}
            defaultValue={cellphone}
            />

            <Input
            label="CPF/CNPJ"
            name="document"
            placeholder="Digíte o CPF ou o CNPJ"
            onChange={(e) => setDocument(e.target.value)}
            defaultValue={document}
            />

            <h2>Alerta de Contato</h2>

            <ChechBox
              label="Emitir o alerta de contato para este Cliente"
              name="send_contact_alert"
              onChange={(e) => setWarnContact(e.target.checked)}
              checked={warnContact}
            />

            <Input
            label="Próximo Contato"
            name="next_contact_date"
            placeholder="Informe a data do Próximo Contato"
            type="date"
            onChange={(e) => setNextContact(e.target.value)}
            defaultValue={nextContact}
            />

            <Button name="Cadastrar" type="submit" />
          </Form>
        </section>

        <section id="table-area">
          <div id="table-border">
            <div id="table-title-area">
              <h3>Pedidos do Cliente</h3>
              <Button
                name="Adicionar"
                color="green"
                size="small"
              />
            </div>

            <Table>
              <thead>
                <tr>
                  <th className="start-border-r td-x1">Status</th>
                  <th className="text-left td-x3">Título</th>
                  <th className="end-border-r td-x2">Processo Atual</th>
                </tr>
              </thead>
              <tbody>
                    <tr key={1}>
                      <td className="text-center td-id td-x1">
                        <Link to={`/order-data/${1}`}>
                          <span
                            className="ic ic-inprogress"
                          >IC</span>
                        </Link>
                      </td>
                      <td className="text-left td-x3">
                        <Link to={`/order-data/${1}`}>
                          Armário de Cozinha
                        </Link>
                        </td>
                      <td className="text-center td-x2">
                      <Link to={`/order-data/${1}`}>
                        {
                          function () {
                            switch(1 - 0) {
                              case(1):
                                return 'Iniciando';
                              case(2):
                                return 'Pedido na Fábrica'
                              case(3):
                                return 'Instalando'
                              case(4):
                                return 'Reunião com os Montadores'
                              default:
                                return 'Não Encontrado';
                            }
                          }()
                        }
                        </Link>
                        <button className="ic-remove" onClick={() => console.log(1)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </main>
    </Container>
  );
};

export default CustomerData;
