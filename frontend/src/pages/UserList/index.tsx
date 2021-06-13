import React, { useEffect, useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SearchButton from '../../components/SearchButton';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

interface IUserProps {
  id: number;
  name: string;
  username: string;
  permission_create_adm: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);

  useEffect(() => {
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/admins`, true);

    request.onload = function() {
      const usersList = JSON.parse(this.response);
      setUsers(usersList);
    }

    request.send();
  }, []);

  const handleDeleteUser = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/admins/${id}`, true);

    request.send();
  }, []);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard"/>
          <NavigationButton text="Usuários" toPage="/users-list" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/clients-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
        </NavigationBar>
      </div>

      <main id="table-area">
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
                <th className="start-border-r text-left td-x2">Nome</th>
                <th className="t-x2">Usuário</th>
                <th className="end-border-r td-x1">Tipo de Conta</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => {
                  return (
                    <tr key={user.id}>
                        <td className="td-id td-x2">
                          <Link to={`/adm-data/${user.id}`}>
                            {user.name}
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={`/adm-data/${user.id}`}>
                            {user.username}
                          </Link>
                        </td>
                        <td className="text-center td-x1">
                          <Link to={`/adm-data/${user.id}`}>
                            {
                              typeof user.permission_create_adm === 'boolean'
                                ? 'Administrador'
                                : 'Montador'
                            }
                          </Link>
                          <button className="ic-remove" onClick={() => handleDeleteUser(user.id)}>
                            <FiTrash2 />
                          </button>
                        </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
};

export default UserList;
