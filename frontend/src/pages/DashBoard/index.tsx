import React, { useState , useCallback , useEffect } from 'react';
import { Container } from './styles';

import Banner from '../../assets/images/BannerDashBoard.jpg';
import NavigationBar from '../../components/NavigationBar';
import DashButton from '../../components/DashButton';
import CheckBox from '../../components/CheckBox';
import NavigationButton from '../../components/NavigationBar/NavigationButton';
import Input from '../../components/Input';
import Button from '../../components/Button';


interface ITaskProps {
  id: number;
  done: boolean;
  title: string;
  description: string;
  task_time: string;
  task_date: string;
}

const DashBoard: React.FC = () =>{
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDate, setTaskDate] = useState('');

  useEffect(() => {
    const request = new XMLHttpRequest();

    request.open('GET', `http://localhost:8080/tasks`, true);

    request.onload = function() {
      const tasksList = JSON.parse(this.response);
      setTasks(tasksList);
    }

    request.send();
  }, []);

  const handleShowPopup = useCallback((id?: number) => {
    setShowPopup(!showPopup);
    setTaskId(id || -1);
    console.log(id);
  }, [showPopup]);

  const handleTaskData = useCallback(function(){
    const request = new XMLHttpRequest();

    request.open('POST', `http://localhost:8080/tasks`, true);

    const task = {
      done,
      title,
      description,
      taskTime,
      taskDate,
    };

    request.setRequestHeader(`Content-Type`, `application/json`);
    request.send(JSON.stringify(task));

    handleShowPopup();
  },[done, title, description, taskTime, taskDate, handleShowPopup]);

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

            {
              tasks.map(task => {
                const label = `${task.title} - ${task.task_date} : ${task.task_time}`;

                return (<CheckBox
                  id={`${task.id}`}
                  label={label}
                  onClickLabel={() => handleShowPopup(task.id)}
                  checked={task.done}
                />);
              })
            }
          </div>
        </main>
      </div>

      {
        showPopup && (
          <div id="task-popup">
            <form>
              <h3>Cadastrar Tarefa</h3>
              <CheckBox
                label="Finalizado"
                onChange={(e) => setDone(e.target.checked)}
              />

              <Input
              label="Título"
              placeholder="Digíte o Título"
              onChange={(e) => setTitle(e.target.value)}
              />

              <Input
              label="Descrição"
              placeholder="Digíte a Descrição"
              onChange={(e) => setDescription(e.target.value)}
              />

              <Input
              label="Horário"
              type="time"
              onChange={(e) => setTaskTime(e.target.value)}
              />

              <Input
              label="Data"
              type="date"
              onChange={(e) => setTaskDate(e.target.value)}
              />

              <Button name="Cadastrar" onClick={handleTaskData} />
              <Button name="Fechar" onClick={() => handleShowPopup()} />
            </form>
          </div>
        )
      }
    </Container>
  );
};

export default DashBoard;
