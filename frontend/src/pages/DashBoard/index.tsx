import React from 'react';
import { Container } from './styles';

import Banner from '../../assets/images/BannerDashBoard.jpg';
import NavigationBar from '../../components/NavigationBar';
import DashButton from '../../components/DashButton';
import CheckBox from '../../components/CheckBox';

const DashBoard: React.FC = () =>{
  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar />
      </div>

      <div id="task-area">
        <div id="banner-area">
          <img src={Banner} alt="Banner" />
        </div>

        <div>

          <h1>Lembretes do Dia</h1>
          <div className= "space-division">
            <div className="v1">
              <DashButton name="Tarefas"/>
            </div>
            <div className="v2">
              <DashButton name="Adicionar"/>
            </div>
          </div>
          <div className="checkB">
            <CheckBox label="Realizar contato com Fulano de Tal"/>
            <CheckBox label="Cofirmar entrega do Móvel de Ciclano de Lat"/>
            <CheckBox label="Entrar em contato com Montador"/>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashBoard;
