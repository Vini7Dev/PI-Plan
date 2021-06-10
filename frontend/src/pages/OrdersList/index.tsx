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
          <NavigationButton text="Usuários" toPage="/" />
          <NavigationButton text="Clientes" toPage="/" />
          <NavigationButton text="Pedidos" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <main id="table-area">
        <form>
          <h1>Pedidos</h1>

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
                <th className="start-border-r td-x1">Código</th>
                <th className="text-left td-x3">Título</th>
                <th className="end-border-r td-x2">Processo Atual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center td-id td-x1">
                  <span className="ic ic-inprogress">IC</span>
                  #0002
                </td>
                <td className="text-left td-x3">Armário de cozinha</td>
                <td className="text-center td-x2">
                  Instalando
                  <button className="ic-remove">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-center td-x1">
                  <span className="ic ic-completed">IC</span>
                  #0001
                </td>
                <td className="text-left td-x3">Guarda roupas masculino</td>
                <td className="text-center td-x2">
                  Finalizado
                  <button className="ic-remove">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
};

export default OrdersList;
