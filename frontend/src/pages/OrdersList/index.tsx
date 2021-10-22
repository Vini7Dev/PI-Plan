import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'
import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';

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
        <NavigationBar optionSelected={3} />
      </div>

      <main id="table-area">
        <Header title="Pedidos" />

        <div id="register-page-link">
          <Link to="order-data">
            Cadastrar
          </Link>
        </div>

        <div id="table-border">
          <Table>
            <thead>
              <tr>
                <th className="start-border-r td-x1">Status</th>
                <th className="text-left td-x3">Título</th>
                <th className="end-border-r td-x2">Processo Atual</th>
              </tr>
            </thead>
            <tbody>
                  <tr key={1}>
                    <td className="text-center td-id td-x1">
                      <Link to={`/order-data/${1}`}>
                        <span
                          className="ic ic-inprogress"
                        >IC</span>
                      </Link>
                    </td>
                    <td className="text-left td-x3">
                      <Link to={`/order-data/${1}`}>
                        Armário de Cozinha
                      </Link>
                      </td>
                    <td className="text-center td-x2">
                    <Link to={`/order-data/${1}`}>
                      {
                        function () {
                          switch(1 - 0) {
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
                      <button className="ic-remove" onClick={() => handleDeleteOrder(1)}>
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

export default OrdersList;
