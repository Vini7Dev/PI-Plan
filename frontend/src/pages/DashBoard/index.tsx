import React from 'react';
import { Container } from './styles';

import Banner from '../../assets/images/BannerDashBoard.jpg';
import NavigationBar from '../../components/NavigationBar';
import DashButton from '../../components/DashButton';
import CheckBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';

const DashBoard: React.FC = () =>{
  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Usuários" toPage="/" />
          <NavigationButton text="Clientes" toPage="/" />
          <NavigationButton text="Pedidos" toPage="/"/>
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <div id="task-area">
        <header id="banner-area">
          <img src={Banner} alt="Banner" />
        </header>

        <main>
          <h1>Lembretes do Dia</h1>
          <div className= "space-division">
            <div className="size2">
              <DashButton name="Tarefas"/>
            </div>
            <div className="size1">
              <DashButton name="Adicionar"/>
            </div>
          </div>
          <div className="checkB">
            <CheckBox label="Realizar contato com Fulano de Tal"/>
            <CheckBox label="Cofirmar entrega do Móvel de Ciclano de Lat"/>
            <CheckBox label="Entrar em contato com Montador"/>
          </div>
        </main>
      </div>
    </Container>
  );
};

export default DashBoard;
