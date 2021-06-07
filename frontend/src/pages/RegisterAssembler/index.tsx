import React from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import SmallButton from '../../components/SmallButton';
import Button from '../../components/Button';
import NavigationButton from '../../components/NavigationBar/NavigationButton';


const RegisterAssembler: React.FC = () =>{
  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/" />
          <NavigationButton text="Pedidos" toPage="/" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <div id="form-area">
        <form>
          <h1>Cadastro de Montador</h1>

          <div className="space-division">
              <SmallButton name="Administrador" backgorundcolor="beige"/>
              <SmallButton name="Montador" backgorundcolor="green"/>
          </div>

          <Input label="Nome" placeholder="Digíte o Nome"/>
          <Input label="Usuário" placeholder="Digíte o Usuário"/>
          <Input label="Telefone" placeholder="Digíte o Telefone"/>
          <Input label="Senha" placeholder="Digíte a Senha"/>
          <Input label="Confirme a Senha" placeholder="Digíte a Senha Novamente"/>

          <Button name="Cadastrar"/>
        </form>
      </div>
    </Container>
  );
};

export default RegisterAssembler;
