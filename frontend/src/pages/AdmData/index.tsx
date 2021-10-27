import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import Header from '../../components/Header';

interface IAdminProps {
  id: number;
  name: string;
  username: string;
  password: string;
  permission_create_adm: boolean;
}

// Página para criar um administrador ou apresentar os seus dados
const AdmData: React.FC = () =>{
  const location = useLocation();
  const [permissionCreateAdmin, setPermissionCreateAdmin] = useState(false);

  // Caso exista o id do administrador na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const userId = location.pathname.split('/adm-data/')[1];
  }, [location]);

  // Função para criar um administrador ou atualizar os seus dados
  const handleSubmitAdmData = useCallback(() => {
    //
  },[]);

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
          />

          <Input
          label="Usuário"
          name="username"
          placeholder="Digíte o Usuário"
          />

          <Input
          label="Senha"
          name="password"
          placeholder="Digíte a Senha"
          type="password"
          />

          <Input
          label="Confirme a Senha"
          name="confirm_password"
          placeholder="Digíte a Senha Novamente"
          type="password"
          />

          <CheckBox
            label="Pode criar administrador"
            name="permission_create_admin"
            onChange={e => setPermissionCreateAdmin(e.target.checked)}
            checked={permissionCreateAdmin}
          />

          <Button name="Cadastrar" type="submit" />
        </Form>
      </main>
    </Container>
  );
};

export default AdmData;
