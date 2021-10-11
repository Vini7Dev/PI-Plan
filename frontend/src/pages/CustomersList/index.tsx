import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

interface IClientProps {
  id: number;
  name: string;
  cellphone: string;
  cpf?: string;
  cnpj?: string;
}

const CustomersList: React.FC = () => {
  const [legalClients, setLegalClients] = useState<IClientProps[]>([]);
  const [physicalClients, setPhysicalClients] = useState<IClientProps[]>([]);

  const handleLoadClients = useCallback(() => {
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

  const handleDeleteLegalClient = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/legalclients/${id}`, true);

    request.onload = function() {
      handleLoadClients();
    }

    request.send();
  }, [handleLoadClients]);

  const handleDeletePhysicalClient = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/physicalclients/${id}`, true);
    request.onload = function() {
      handleLoadClients();
    }

    request.send();
  }, [handleLoadClients]);

  return (
    <Container onLoad={handleLoadClients}>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Portfólio" toPage="/" />
          <NavigationButton text="Página Inicial" toPage="/dashboard" />
          <NavigationButton text="Usuários" toPage="/users-list"/>
          <NavigationButton text="Clientes" toPage="/customers-list" id="nav-link-selected" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
          <NavigationButton text="Sair" toPage="/" />
        </NavigationBar>
      </div>

      <main id="table-area">
        <h1 id="title">Clientes</h1>

        <div id="register-page-link">
          <Link to="customer-data">
            Cadastrar
          </Link>
        </div>

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
                      <Link to={`/client-data/${client.id}`}>
                        {client.name}
                      </Link>
                    </td>

                    <td className="td-x1">
                      <Link to={`/client-data/${client.id}`}>
                        {client.cnpj}
                      </Link>
                    </td>

                    <td className="text-right td-x1">
                      <Link to={`/client-data/${client.id}`}>
                        {client.cellphone}
                      </Link>
                      <button className="ic-remove" onClick={() => handleDeleteLegalClient(client.id)}>
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
                      <Link to={`/client-data/${client.id}`}>
                        {client.name}
                      </Link>
                    </td>

                    <td className="td-x1">
                      <Link to={`/client-data/${client.id}`}>
                        {client.cpf}
                      </Link>
                    </td>

                    <td className="text-right td-x1">
                      <Link to={`/client-data/${client.id}`}>
                        {client.cellphone}
                      </Link>
                      <button className="ic-remove" onClick={() => handleDeletePhysicalClient(client.id)}>
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

export default CustomersList;
