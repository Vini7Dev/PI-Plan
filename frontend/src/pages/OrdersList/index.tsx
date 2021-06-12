import React, { useEffect, useState , useCallback } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SearchButton from '../../components/SearchButton';
import NavigationButton from '../../components/NavigationBar/NavigationButton';


interface IOrderProps {
  id: number;
  actualStatus: number;
  actualProcess: number;
  title: string;
  description: string;
  startDate: Date;
  finalDate: Date;
  previsionFinalDate: Date;
  cep: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  country: string;
  installationEnvironments: string;
  paymentMethod: string;
  grossValue: number;
  netValue: number;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<IOrderProps[]>([]);

  useEffect(() => {
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/orders`, true);

    request.onload = function() {
      const ordersList = JSON.parse(this.response);
      setOrders(ordersList);
    }

    request.send();
  }, []);

  const handleDeleteOrder = useCallback((id: number) => {
    return id;
  }, []);

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
              {
                orders.map(order => (
                  <tr>
                    <td className="text-center td-id td-x1">
                      <span
                        className={`ic
                          ${order.actualStatus === 1 && 'ic-inprogress'}
                          ${order.actualStatus === 2 && 'ic-completed'}
                          ${order.actualStatus === 3 && 'ic-canceled'}
                        `}
                      >IC</span>
                      #{order.id}
                    </td>
                    <td className="text-left td-x3">{order.title}</td>
                    <td className="text-center td-x2">
                      {`
                        ${order.actualProcess === 1 && 'Iniciando'}
                        ${order.actualProcess === 2 && 'Pedido na Fábrica'}
                        ${order.actualProcess === 3 && 'Instalando'}
                        ${order.actualProcess === 4 && 'Pedido Finalizado'}
                      `}
                      <button className="ic-remove" onClick={() => handleDeleteOrder(order.id)}>
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

export default OrdersList;
