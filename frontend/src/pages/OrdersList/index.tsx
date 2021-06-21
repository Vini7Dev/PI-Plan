import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

interface IOrderProps {
  id: number;
  actual_status: number;
  actual_process: number;
  title: string;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<IOrderProps[]>([]);

  const handleLoadOrders = useCallback(() => {
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/orders`, true);

    request.onload = function() {
      const ordersList = JSON.parse(this.response);
      setOrders(ordersList);
    }

    request.send();
  }, []);

  const handleDeleteOrder = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/orders/${id}`, true);
    request.onload = function() {
      handleLoadOrders();
    }

    request.send();
  }, [handleLoadOrders]);

  return (
    <Container onLoad={handleLoadOrders}>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard"/>
          <NavigationButton text="Usuários" toPage="/users-list"/>
          <NavigationButton text="Clientes" toPage="/clients-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" id="nav-link-selected" />
          <NavigationButton text="Sair" toPage="/" />
        </NavigationBar>
      </div>

      <main id="table-area">
        <h1 id="title">Pedidos</h1>

        <div id="register-page-link">
          <Link to="order-data">
            Cadastrar
          </Link>
        </div>

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
                  <tr key={order.id}>
                    <td className="text-center td-id td-x1">
                    <Link to={`/order-data/${order.id}`}>
                      <span
                        className={`ic
                          ${order.actual_status === 1 && 'ic-inprogress'}
                          ${order.actual_status === 2 && 'ic-completed'}
                          ${order.actual_status === 3 && 'ic-canceled'}
                        `}
                      >IC</span>
                      </Link>
                      <Link to={`/order-data/${order.id}`}>
                        #{order.id}
                      </Link>
                    </td>
                    <td className="text-left td-x3">
                      <Link to={`/order-data/${order.id}`}>
                        {order.title}
                      </Link>
                      </td>
                    <td className="text-center td-x2">
                    <Link to={`/order-data/${order.id}`}>
                      {
                        function () {
                          switch(order.actual_process) {
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
