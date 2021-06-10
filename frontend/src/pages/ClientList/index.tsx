import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SearchButton from '../../components/SearchButton';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const ClientList: React.FC = () => {
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
                <th className="text-right end-border-r td-x1">Telefonico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left td-id td-x2">
                  Fulano de Tal
                </td>

                <td className="text-right td-x1">
                (16) 91234-5678
                  <button className="ic-remove">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-left td-x2">
                  Ciclano de Tal
                </td>
                <td className="text-right td-x2">
                (16) 98765-4321
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

export default ClientList;
