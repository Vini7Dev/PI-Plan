import React from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SmallButton from '../../components/SmallButton';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';


const RegisterAssembler: React.FC = () =>{
  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar />
      </div>

      <div id="form-area">
        <form>
          <h1>Cadastro de Administrador</h1>

          <div className="space-division">
              <SmallButton name="Administrador" backgorundcolor="beige"/>
              <SmallButton name="Montador" backgorundcolor="green"/>
          </div>

          <Input label="Nome" placeholder="Digíte o Nome"/>
          <Input label="Usuário" placeholder="Digíte o Usuário"/>
          <Input label="Senha" placeholder="Digíte a Senha"/>
          <Input label="Confirme a Senha" placeholder="Digíte a Senha Novamente"/>

          <CheckBox label="Pode criar administrador" />

          <Button name="Cadastrar"/>
        </form>
      </div>
    </Container>
  );
};

export default RegisterAssembler;
