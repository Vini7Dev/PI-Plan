import React, { useEffect, useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
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

  const handleDeleteLegalClient = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/legalclient/${id}`, true);

    request.send();
  }, []);

  const handleDeletePhysicalClient = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/physicalclient/${id}`, true);

    request.send();
  }, []);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard" />
          <NavigationButton text="Usuários" toPage="/users-list"/>
          <NavigationButton text="Clientes" toPage="/clients-list" id="nav-link-selected" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
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

export default ClientList;
