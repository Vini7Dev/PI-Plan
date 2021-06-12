import React, { useState , useCallback } from 'react';
import { Container } from './styles';

import Banner from '../../assets/images/BannerDashBoard.jpg';
import NavigationBar from '../../components/NavigationBar';
import DashButton from '../../components/DashButton';
import CheckBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';
import Input from '../../components/Input';
import Button from '../../components/Button';


const DashBoard: React.FC = () =>{
  const [showPopup, setShowPopup] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const handleShowPopup = useCallback((id?: number) => {
    setShowPopup(!showPopup);
    setTaskId(id || -1);
    console.log(id);
  }, [showPopup]);

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
              <DashButton name="Adicionar" onClick={() => handleShowPopup()}/>
            </div>
          </div>
          <div className="checkB">
            <CheckBox
              label="Realizar contato com Fulano de Tal"
              id="1"
              onClickLabel={() => handleShowPopup(1)}
            />
            <CheckBox
              label="Cofirmar entrega do Móvel de Ciclano de Lat"
              id="2"
              onClickLabel={() => handleShowPopup(1)}
            />
            <CheckBox
              label="Entrar em contato com Montador"
              id="3"
              onClickLabel={() => handleShowPopup(1)}
            />
          </div>
        </main>
      </div>

      {
        showPopup && (
          <div id="task-popup">
            <form>
              <h3>Cadastrar Tarefa</h3>
              <CheckBox label="Finalizado" />
              <Input label="Título" />
              <Input label="Descrição" />
              <Input label="Horário" type="time" />
              <Input label="Data" type="date" />
              <Button name="Cadastrar" />
              <Button name="Fechar" onClick={() => handleShowPopup()} />
            </form>
          </div>
        )
      }
    </Container>
  );
};

export default DashBoard;
