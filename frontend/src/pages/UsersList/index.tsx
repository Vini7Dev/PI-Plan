import React, { useState , useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import { Container, Table } from './styles';

import SearchBarButton from '../../components/SearchBarButton';
import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';

interface IUserProps {
  id: number;
  name: string;
  username: string;
  permission_create_adm: boolean;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);

  const handleLoadUsers = useCallback(() => {
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
    request.onload = function() {
      handleLoadUsers();
    }

    request.send();
  }, [handleLoadUsers]);

  return (
    <Container onLoad={handleLoadUsers}>
      <div id="navigation-area">
        <NavigationBar optionSelected={1} />
      </div>

      <main id="table-area">
        <Header title="Usuários">
          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Procure por um usuário"
            onClickInSearchButton={() => {
              //
            }}
          />
        </Header>

        <div id="register-page-link">
          <Link to="adm-data">
            Cadastrar
          </Link>
        </div>

        <div id="table-border">
          <Table>
            <thead>
              <tr>
                <th className="start-border-r text-left td-x2">Nome</th>
                <th className="t-x2">Usuário</th>
                <th className="end-border-r td-x1">Tipo de Conta</th>
              </tr>
            </thead>
            <tbody>
                    <tr>
                        <td className="td-id td-x2">
                          <Link to={`/adm-data/${1}`}>
                            Admin1
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={`/adm-data/${1}`}>
                            admin1
                          </Link>
                        </td>
                        <td className="text-center td-x1">
                          <Link to={`/adm-data/${1}`}>
                            {
                              typeof true === 'boolean'
                                ? 'Administrador'
                                : 'Montador'
                            }
                          </Link>
                          <button className="ic-remove" onClick={() => handleDeleteUser(1)}>
                            <FiTrash2 />
                          </button>
                        </td>
                    </tr>

                    <tr>
                        <td className="td-id td-x2">
                          <Link to={`/assembler-data/${1}`}>
                            Mont1
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={`/assembler-data/${1}`}>
                            mont1
                          </Link>
                        </td>
                        <td className="text-center td-x1">
                          <Link to={`/assembler-data/${1}`}>
                            {
                              typeof 0 === 'boolean'
                                ? 'Administrador'
                                : 'Montador'
                            }
                          </Link>
                          <button className="ic-remove" onClick={() => handleDeleteUser(1)}>
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

export default UsersList;
