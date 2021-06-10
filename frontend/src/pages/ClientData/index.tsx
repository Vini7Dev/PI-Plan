import React from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const ClientData: React.FC = () =>{
  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" />
          <NavigationButton text="Clientes" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Pedidos" toPage="/" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Cadastro de Cliente</h1>

          <Input label="Nome" placeholder="Digíte o Nome"/>
          <Input label="Telefone" placeholder="Digíte o Telefone"/>
          <Input label="CPF/CNPJ" placeholder="Digíte o CPF / CNPJ"/>

          <h1>Alerta de Contato</h1>

          <ChechBox label="Emitir alerta para este Cliente"/>

          <Input label="Ultimo Contato" placeholder="Informe a data do Ultimo Contato"/>
          <Input label="Próximo Contato" placeholder="Informe a data do Próximo Contato"/>

          <Button name="Cadastrar"/>
        </form>
      </main>
    </Container>
  );
};

export default ClientData;
