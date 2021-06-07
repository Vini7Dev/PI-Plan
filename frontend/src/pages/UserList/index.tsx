import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SearchButton from '../../components/SearchButton';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const OrdersList: React.FC = () => {
  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/" />
          <NavigationButton text="Pedidos" toPage="/" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <div id="table-area">
        <form>
          <h1>Usuário</h1>

          <div className="space-division">
            <div className="x2">
              <Input label="Buscar" placeholder="Informe algum dado do pedido" />
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
                <th className="start-border-r td-x1">Nome</th>
                <th className="text-left t-x3">Usuário</th>
                <th className="end-border-r td-x2">Tipo de Conta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center td-id td-x1">

                  Usuario1
                </td>
                <td className="text-left td-x3">Usuario123</td>
                <td className="text-center td-x2">
                  Administrador
                  <button className="ic-remove">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-center td-x1">

                  Usuario2
                </td>
                <td className="text-left td-x3">Usuario123</td>
                <td className="text-center td-x2">
                  Montador
                  <button className="ic-remove">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default OrdersList;
