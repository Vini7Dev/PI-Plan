import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import SearchBarButton from '../../components/SearchBarButton';

interface IOrderProps {
  id: string;
  customer_id: string;
  current_status: number;
  current_proccess: number;
  title: string;
}

// Página de listagem dos pedidos
const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<IOrderProps[]>([]);
  const [searchString, setSearchString] = useState('');

  // Buscando os pedidos cadastrados
  const handleLoadOrders = useCallback(async () => {
    const { data: ordersList } = await api.get<IOrderProps[]>(`/orders${
      searchString ? `?search_string=${searchString}` : ''
    }`);

    setOrders(ordersList);
  }, [searchString]);

  // Apagando um pedido
  const handleDeleteOrder = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar o pedido
    const response = confirm('Você realmente deseja apagar o pedido?');

    if(!response) {
      return;
    }

    // Enviando a requisição para apagar o pedido
    await api.delete(`/orders/${id}`);

    // Recarregando a lista de pedidos
    handleLoadOrders();
  }, [handleLoadOrders]);

  return (
    <Container onLoad={handleLoadOrders}>
      <div id="navigation-area">
        <NavigationBar optionSelected={3} />
      </div>

      <main id="table-area">
        <Header title="Pedidos">
          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Procure por um pedido"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onClickInSearchButton={handleLoadOrders}
          />
        </Header>

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
              {
                orders.length > 0
                  ? orders.map(order => (
                    <tr key={order.id}>
                      <td className="text-center td-id td-x1">
                        <Link to={`/order-data/${order.id}?customer_id=${order.customer_id}`}>
                          <span
                            className={`ic ${
                              (function() {
                                switch(order.current_status) {
                                  case 0: return 'ic-inprogress';
                                  case 1: return 'ic-completed';
                                  case 2: return 'ic-canceled';
                                  default: return 'ic-canceled';
                                }
                              })()
                            }`}
                          >IC</span>
                        </Link>
                      </td>
                      <td className="text-left td-x3">
                        <Link to={`/order-data/${order.id}?customer_id=${order.customer_id}`}>
                          {order.title}
                        </Link>
                        </td>
                      <td className="text-center td-x2">
                      <Link to={`/order-data/${order.id}?customer_id=${order.customer_id}`}>
                        {
                          function () {
                            switch(order.current_proccess) {
                              case(0):
                                return 'Iniciando';
                              case(1):
                                return 'Pedido na Fábrica'
                              case(2):
                                return 'Instalando'
                              case(3):
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
                  : <tr><td colSpan={3}><p id="empty-orders-list">Sem pedidos...</p></td></tr>
              }
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
};

export default OrdersList;
