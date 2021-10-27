import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import SearchBarButton from '../../components/SearchBarButton';

interface IClientProps {
  id: number;
  name: string;
  cellphone: string;
  document?: string;
}

const CustomersList: React.FC = () => {
  const [clients, setClients] = useState<IClientProps[]>([]);

  const handleLoadClients = useCallback(() => {
    const requestClients = new XMLHttpRequest();

    requestClients.open('GET', `http://localhost:8080/clients`, true);

    requestClients.onload = function() {
      setClients(JSON.parse(this.response));
    }

    requestClients.send();
  }, []);

  const handleDeleteClient = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/legalclients/${id}`, true);

    request.onload = function() {
      handleLoadClients();
    }

    request.send();
  }, [handleLoadClients]);

  return (
    <Container onLoad={handleLoadClients}>
      <div id="navigation-area">
        <NavigationBar optionSelected={2} />
      </div>

      <main id="table-area">
        <Header title="Clientes">
          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Procure por um cliente"
            onClickInSearchButton={() => {
              //
            }}
          />
        </Header>

        <div id="register-page-link">
          <Link to="customer-data">
            Cadastrar
          </Link>
        </div>

        <div id="table-border">
          <Table>
            <thead>
              <tr>
                <th className="text-left start-border-r td-x2">Título</th>
                <th className="td-x1">CPF / CNPJ</th>
                <th className="text-right end-border-r td-x1">Telefone</th>
              </tr>
            </thead>
            <tbody>
                  <tr key={1}>
                    <td className="text-left td-id td-x2">
                      <Link to={`/client-data/${1}`}>
                        Fulano de Tal
                      </Link>
                    </td>

                    <td className="td-x1 text-center">
                      <Link to={`/client-data/${1}`}>
                        123.456.789-00
                      </Link>
                    </td>

                    <td className="text-right td-x1">
                      <Link to={`/client-data/${1}`}>
                        (16) 91234-5678
                      </Link>
                      <button className="ic-remove" onClick={() => handleDeleteClient(1)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>

                  <tr key={2}>
                    <td className="text-left td-id td-x2">
                      <Link to={`/client-data/${2}`}>
                        Ciclano de Lat
                      </Link>
                    </td>

                    <td className="td-x1 text-center">
                      <Link to={`/client-data/${2}`}>
                        987.654.321-00
                      </Link>
                    </td>

                    <td className="text-right td-x1">
                      <Link to={`/client-data/${2}`}>
                        (16) 99999-9999
                      </Link>
                      <button className="ic-remove" onClick={() => handleDeleteClient(2)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
};

export default CustomersList;
