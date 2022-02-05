import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import { Container, Table } from './styles';

import Loading from '../../components/Loading';
import SearchBarButton from '../../components/SearchBarButton';
import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';

interface IUserProps {
  id: string;
  name: string;
  username: string;
  cellphone?: string;
  permission_create_adm?: boolean;
  user_type: 'admin' | 'assembler';
}

// Página para listagem dos usuários cadastrados
const UsersList: React.FC = () => {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [searchString, setSearchString] = useState('');

  // Função para carregar os usuários cadastrados
  const handleLoadUsers = useCallback(async () => {
    setLoadingUsers(true);

    try {
      if (searchString) {
        const { data: userList } = await api.get<IUserProps[]>(`/users?search_string=${searchString}`);

        setUsers(userList);
        setSearchString('');
      } else {
        const { data: adminsList } = await api.get<IUserProps[]>('/admins');

        const { data: assemblersList } = await api.get<IUserProps[]>('/assemblers');

        setUsers([...adminsList, ...assemblersList]);
      }
    } catch (err) {
      console.log(err);
    }

    setLoadingUsers(false);
  }, [searchString]);

  // Função para apagar um usuário
  const handleDeleteUser = useCallback(async (id: string, user_type: 'admin' | 'assembler') => {
    // Verificando se o usuário realmente deseja apagar o usuário
    const response = confirm('Você realmente deseja apagar o usuário?');

    if (!response) {
      return;
    }

    // Verificando qual o tipo do usuário para apaga-lo
    if (user_type === 'admin') {
      await api.delete(`/admins/${id}`);
    } else {
      await api.delete(`/assemblers/${id}`);
    }

    // Recarregando a lista de usuários
    handleLoadUsers();
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
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onClickInSearchButton={handleLoadUsers}
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
              {
                loadingUsers
                  ? <tr><td colSpan={3}><p id="empty-assessments-list"><Loading /></p></td></tr>
                  : users.length > 0
                    ? users.map(user => (
                      <tr key={user.id}>
                        <td className="td-id td-x2">
                          <Link to={
                            `/${user.user_type === 'admin' ? 'adm-data' : 'assembler-data'}/${user.id}`}
                          >
                            {user.name}
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={
                            `/${user.user_type === 'admin' ? 'adm-data' : 'assembler-data'}/${user.id}`}
                          >
                            {user.username}
                          </Link>
                        </td>
                        <td className="text-center td-x1">
                          <Link to={
                            `/${user.user_type === 'admin' ? 'adm-data' : 'assembler-data'}/${user.id}`}
                          >
                            {
                              user.user_type === 'admin'
                                ? 'Administrador'
                                : 'Montador'
                            }
                          </Link>
                          <button
                            className="ic-remove"
                            onClick={() => handleDeleteUser(user.id, user.user_type)}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                    : <tr><td colSpan={3}><p id="empty-users-list">Sem usuários...</p></td></tr>
              }
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
};

export default UsersList;
