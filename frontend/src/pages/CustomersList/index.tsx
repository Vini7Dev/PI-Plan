import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import SearchBarButton from '../../components/SearchBarButton';

interface IClientProps {
  id: string;
  name: string;
  cellphone: string;
  document?: string;
}

// Página de listagem dos clientes
const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<IClientProps[]>([]);

  // Função para carregar os clientes cadastrados
  const handleLoadCustomers = useCallback(async () => {
    const { data: customersList } = await api.get<IClientProps[]>('/customers');

    setCustomers(customersList);
  }, []);

  // Função para apagar um cliente
  const handleDeleteCustomer = useCallback((id: string) => {
    //
  }, []);

  return (
    <Container onLoad={handleLoadCustomers}>
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
              {
                customers.length > 0
                  ? customers.map(customer => (
                    <tr key={customer.id}>
                      <td className="text-left td-id td-x2">
                        <Link to={`/customer-data/${customer.id}`}>
                          { customer.name }
                        </Link>
                      </td>

                      <td className="td-x1 text-center">
                        <Link to={`/customer-data/${customer.id}`}>
                          { customer.document || 'Vazio...' }
                        </Link>
                      </td>

                      <td className="text-right td-x1">
                        <Link to={`/customer-data/${customer.id}`}>
                          { customer.cellphone }
                        </Link>
                        <button className="ic-remove" onClick={() => handleDeleteCustomer(customer.id)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                  : null
              }
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
};

export default CustomersList;
