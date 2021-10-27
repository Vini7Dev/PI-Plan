import React, { useCallback, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

interface IAssemblerProps {
  id: number;
  name: string;
  username: string;
  password: string;
  cellphone: boolean;
}

// Página para criar um montador ou apresentar os seus dados
const AssemblerData: React.FC = () =>{
  const location = useLocation();

  // Caso exista o id do montador na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const userId = location.pathname.split('/assembler-data/')[1];
  }, [location]);

  // Função para criar um montador ou atualizar os seus dados
  const handleSubmitAdmData = useCallback(async () =>{
    //
  },[]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={1} />
      </div>

      <main id="form-area">
        <Header title="Cadastro de Montador" />

        <Form onSubmit={handleSubmitAdmData}>
          <div id="user-type-buttons-area">
            <div className="user-type-button">
              <Link to="/adm-data/">
                <Button name="Administrador" color="brown" active={false} />
              </Link>
            </div>
            <div className="user-type-button">
              <Button name="Montador" />
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
              label="Telefone"
              name="cellphone"
              placeholder="(99) XXXXX-XXXX"
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

          <Button name="Cadastrar" type="submit" />
        </Form>
      </main>
    </Container>
  );
};

export default AssemblerData;
