import React, { useEffect, useState , useCallback } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SearchButton from '../../components/SearchButton';
import NavigationButton from '../../components/NavigationBar/NavigationButton';


interface IClientProps {
  id: number;
  name: string;
  cellphone: string;
  cpf?: string;
  cnpj?: string;
}

const ClientList: React.FC = () => {
  const [legalClients, setLegalClients] = useState<IClientProps[]>([]);
  const [physicalClients, setPhysicalClients] = useState<IClientProps[]>([]);

  useEffect(() => {
    const requestLegalClients = new XMLHttpRequest();
    const requestPhysicalClients = new XMLHttpRequest();

    requestLegalClients.open('GET', `http://localhost:8080/legalclients`, true);
    requestPhysicalClients.open('GET', `http://localhost:8080/physicalclients`, true);

    requestLegalClients.onload = function() {
      setLegalClients(JSON.parse(this.response));
    }

    requestPhysicalClients.onload = function() {
      setPhysicalClients(JSON.parse(this.response));
    }

    requestLegalClients.send();
    requestPhysicalClients.send();
  }, []);

  const handleDeleteClient = useCallback((id: number) => {
    return id;
  }, []);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
         <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" />
          <NavigationButton text="Clientes" toPage="/" id="nav-link-selected"  />
          <NavigationButton text="Pedidos" toPage="/"/>
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <main id="table-area">
        <form>
          <h1>Clientes</h1>

          <div className="space-division">
            <div className="x2">
              <Input label="Buscar" placeholder="Informe algum dado do cliente" />
            </div>
            <div className="x1">
              <SearchButton />
            </div>
          </div>
        </form>

        <div id="table-border">
          <table>
            <thead>
              <tr>
                <th className="text-left start-border-r td-x2">Título</th>
                <th className="td-x1">CPF / CNPJ</th>
                <th className="text-right end-border-r td-x1">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {
                legalClients.map(client => (
                  <tr key={client.id}>
                    <td className="text-left td-id td-x2">
                      {client.name}
                    </td>

                    <td className="td-x1">
                      {client.cnpj}
                    </td>

                    <td className="text-right td-x1">
                      {client.cellphone}
                      <button className="ic-remove" onClick={() => handleDeleteClient(client.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              }
              {
                physicalClients.map(client => (
                  <tr key={client.id}>
                    <td className="text-left td-id td-x2">
                      {client.name}
                    </td>

                    <td className="td-x1">
                      {client.cpf}
                    </td>

                    <td className="text-right td-x1">
                      {client.cellphone}
                      <button className="ic-remove" onClick={() => handleDeleteClient(client.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
};

export default ClientList;
