import React, { useState, useCallback, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SmallButton from '../../components/SmallButton';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

interface IAdminProps {
  id: number;
  name: string;
  username: string;
  password: string;
  permission_create_adm: boolean;
}

const AdmData: React.FC = () =>{
  const location = useLocation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [permissionCreateAdmin, setPermissionCreateAdmin] = useState(false);

  useEffect(() => {
    const userId = location.pathname.split('/adm-data/')[1];

    if(userId) {
      const request = new XMLHttpRequest();

      request.open('GET', `http://localhost:8080/admins/${userId}`, true);

      request.onload = function() {
        if(this.response) {
          const userData = JSON.parse(this.response);

          setName(userData.name);
          setUsername(userData.username);
          setPassword(userData.password);
          setPermissionCreateAdmin(userData.permission_create_adm);
        }
      }

      request.send();
    }
  }, [location]);

  const handleAdmData = useCallback(function(){
    const userId = location.pathname.split('/adm-data/')[1];

    const admin = {
      name,
      username,
      password,
      permission_create_adm: permissionCreateAdmin,
    } as IAdminProps;

    let httpVerb = '';
    if(userId) {
      httpVerb = 'PUT';
      admin.id = Number(userId);
    } else {
      httpVerb = 'POST';
    }

    const request = new XMLHttpRequest();

    request.open(httpVerb, `http://localhost:8080/admins`, true);

    if(password !== confirmPassword) {
      alert('Erro ao confirmar a senha.');
      return;
    }

    request.setRequestHeader(`Content-Type`, `application/json`);
    request.send(JSON.stringify(admin));

    alert('Admin cadastrado.');
  },[name, username, password, confirmPassword, permissionCreateAdmin, location]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard" />
          <NavigationButton text="Usuários" toPage="/users-list" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/clients-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Cadastro de Administrador</h1>

          <div className="space-division">
              <SmallButton name="Administrador" backgorundcolor="beige"/>
              <SmallButton name="Montador" backgorundcolor="green"/>
          </div>

          <Input
          label="Nome"
          placeholder="Digíte o Nome"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          />

          <Input
          label="Usuário"
          placeholder="Digíte o Usuário"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          <Input
          label="Senha"
          placeholder="Digíte a Senha"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <Input
          label="Confirme a Senha"
          placeholder="Digíte a Senha Novamente"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <CheckBox
            label="Pode criar administrador"
            onChange={e => setPermissionCreateAdmin(e.target.checked)}
            defaultChecked={permissionCreateAdmin}
          />

          <Button name="Cadastrar" onClick={handleAdmData} />
        </form>
      </main>
    </Container>
  );
};

export default AdmData;
