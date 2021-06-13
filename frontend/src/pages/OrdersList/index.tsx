import React, { useEffect, useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SearchButton from '../../components/SearchButton';
import NavigationButton from '../../components/NavigationBar/NavigationButton';


interface IOrderProps {
  id: number;
  actual_status: number;
  actual_process: number;
  title: string;
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
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/orders/${id}`, true);

    request.send();
  }, []);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard"/>
          <NavigationButton text="Usuários" toPage="/users-list"/>
          <NavigationButton text="Clientes" toPage="/clients-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" id="nav-link-selected" />
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
