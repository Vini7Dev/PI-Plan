import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Form } from '@unform/web';

import api from '../../services/api';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import Header from '../../components/Header';

interface IAdminProps {
  id: string;
  name: string;
  username: string;
  password: string;
  permission_create_admin: boolean;
}

// Página para criar um administrador ou apresentar os seus dados
const AdmData: React.FC = () =>{
  const location = useLocation();
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<IAdminProps>({} as IAdminProps);
  const [permissionCreateAdmin, setPermissionCreateAdmin] = useState(false);

  // Caso exista o id do administrador na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const loadUserData = async () => {
      const userIdFromPath = location.pathname.split('/adm-data/')[1];

      // Caso exista o id, buscando os dados do usuário
      if(userIdFromPath) {
        // Buscando os dados
        const { data: userDataResponse } = await api.get<IAdminProps>(`/admins/${userIdFromPath}`);

        // Salvando os dados do usuário
        setUserData(userDataResponse);
        setUserId(userIdFromPath);
        setPermissionCreateAdmin(userDataResponse.permission_create_admin);
      } else {
        setUserData({} as IAdminProps);
      }
    }

    loadUserData();
  }, [location, userId]);

  // Função para criar um administrador ou atualizar os seus dados
  const handleSubmitAdmData = useCallback(async (data) => {
    // Verificando se a confirmação de senha é válida
    if(data.new_password !== data.confirm_password) {
      alert('A senha não foi confirmada corretamente!');

      return;
    }

    // Verificando se está atualizando os dados ou criando um novo usuário
    if(userId) {
      const userDataUpdated = {
        name: data.name,
        username: data.username,
        new_password: data.new_password || undefined,
        current_password: data.current_password,
      };

      await api.put(`/admins/${userId}`, userDataUpdated);
    } else {
      const userDataToCreate = {
        name: data.name,
        username: data.username,
        password: data.new_password,
        permission_create_admin: permissionCreateAdmin,
      };

      await api.post('/admins', userDataToCreate);
    }

    // Enviando o usuário para a tela de listagem
    history.push('/users-list')
  },[userId, permissionCreateAdmin, history]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={1} />
      </div>

      <main id="form-area">
        <Header title="Cadastro de Administrador" />

        <Form onSubmit={handleSubmitAdmData}>
          <div id="user-type-buttons-area">
            <div className="user-type-button">
              <Button name="Administrador" color="brown" />
            </div>
            <div className="user-type-button">
              <Link to="/assembler-data/">
                <Button name="Montador" active={false} />
              </Link>
            </div>
          </div>

          <Input
          autoFocus
          label="Nome"
          name="name"
          placeholder="Digíte o Nome"
          defaultValue={userData.name}
          />

          <Input
          label="Usuário"
          name="username"
          placeholder="Digíte o Usuário"
          defaultValue={userData.username}
          />

          <Input
          label="Senha Atual"
          name="current_password"
          placeholder="Informe a Senha Atual"
          type="password"
          hidden={!userId}
          />

          <Input
          label={userId ? 'Nova Senha' : 'Senha'}
          name="new_password"
          placeholder={userId ? 'Digíte a Nova Senha' : 'Digíte a Senha'}
          type="password"
          />

          <Input
          label="Confirme a Senha"
          name="confirm_password"
          placeholder="Digíte a Senha Novamente"
          type="password"
          />

          {
            !userId && <CheckBox
              label="Pode criar administrador"
              name="permission_create_adminin"
              onChange={e => setPermissionCreateAdmin(e.target.checked)}
              checked={permissionCreateAdmin}
            />
          }

          <Button name="Cadastrar" type="submit" />
        </Form>
      </main>
    </Container>
  );
};

export default AdmData;
