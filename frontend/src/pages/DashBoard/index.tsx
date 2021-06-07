import React from 'react';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import DashButton from '../../components/DashButton';
import CheckBox from '../../components/CheckBox';

const DashBoard: React.FC = () =>{
  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar />
      </div>

      <div id="form-area">

        <form>
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
        </form>
      </div>
    </Container>
  );
};

export default DashBoard;
