import React, { useState , useCallback } from 'react';
import Carousel from 'react-elastic-carousel';
import { FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import DashButton from '../../components/DashButton';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalView from '../../components/ModalView';

import ReminderItem from '../../components/ReminderItem';

interface ITaskProps {
  id: number;
  done: boolean;
  title: string;
  description: string;
  task_date: string;
}

const DashBoard: React.FC = () =>{
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskId, setTaskId] = useState(-1);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const breakPoints = [
    { width: 180, itemsToShow: 1 },
    { width: 360, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 720, itemsToShow: 4 },
  ];

  const handleShowPopup = useCallback((id?: number) => {
    setShowPopup(!showPopup);

    if(id) {
      setTaskId(id);
      const request = new XMLHttpRequest();

      request.open('GET', `http://localhost:8080/tasks/${id}`, true);

      request.onload = function() {
        const taskData = JSON.parse(this.response);

        const taskDateTime = taskData.task_date.split(/t+/i);

        setDone(taskData.done);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setTaskTime(taskDateTime[1].slice(0, 5));
        setTaskDate(taskDateTime[0]);
      }

      request.send();
    } else {
      setTaskId(-1);
      setDone(false);
      setTitle('');
      setDescription('');
      setTaskTime('');
      setTaskDate('');
    }

  }, [showPopup]);

  const handleLoadTasks = useCallback(() => {
      const request = new XMLHttpRequest();

      request.open('GET', `http://localhost:8080/tasks`, true);

      request.onload = function() {
        const tasksList = JSON.parse(this.response);
        setTasks(tasksList);
      }

      request.send();
  }, []);

  const handleSubmitTaskData = useCallback(function(){
    const request = new XMLHttpRequest();

    const task_date = `${taskDate}T${taskTime}:00`;

    const task = {
      done,
      title,
      description,
      task_date,
    } as ITaskProps;

    let httpVerb = '';
    if(taskId !== -1) {
      httpVerb = 'PUT';
      task.id = Number(taskId);
    } else {
      httpVerb = 'POST';
    }

    request.open(httpVerb, `http://localhost:8080/tasks`, true);

    request.onload = function() {
      handleLoadTasks();
    }

    request.setRequestHeader(`Content-Type`, `application/json`);
    request.send(JSON.stringify(task));

    handleShowPopup();
  },[done, title, description, taskTime, taskDate, taskId, handleShowPopup, handleLoadTasks]);

  const handleDeleteTask = useCallback((id: number) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', `http://localhost:8080/tasks/${id}`, true);

    request.onload = function() {
      handleLoadTasks();
    }

    request.send();
  }, [handleLoadTasks]);

  return(
    <Container onLoad={handleLoadTasks}>
      <div id="navigation-area">
        <NavigationBar optionSelected={0} />
      </div>

      <div id="page-area">
        <Header title="Lembretes do Dia" />

        <div id="scroll-items-area">
          <Carousel
            isRTL={false}
            itemsToShow={4}
            pagination={false}
            breakPoints={breakPoints}
            disableArrowsOnEnd={false}
          >
            <ReminderItem
              id="1"
              title="Título do Pedido"
              subtitle="Modelagem"
              description="Descrição detalhada do pedido..."
              reminder_type="order"
            />
            <ReminderItem
              id="2"
              title="Título da Instalação"
              subtitle="Finalizar em 10/09"
              description="Descrição detalhada do pedido..."
              reminder_type="installation"
            />
            <ReminderItem
              id="3"
              title="Contactar Cliente"
              subtitle="Contactar em 08/09"
              description="(99)12345-6789"
              reminder_type="contact_alert"
            />
          </Carousel>
        </div>

        <main>
          <div className= "space-division">
            <div className="size2">
              <DashButton name="Tarefas"/>
            </div>
            <div className="size1">
              <DashButton name="Adicionar" onClick={() => handleShowPopup()}/>
            </div>
          </div>
          <div id="tasks-list">
            {
              tasks.length ?  tasks.map(task => {
                const dateAndTime = task.task_date.split(/t+/i);
                const date = dateAndTime[0].replaceAll('-', '/');
                const time = dateAndTime[1].slice(0, 5);

                const label = `${task.title} | ${date} - ${time}`;
                return (
                  <div className="task-item" key={task.id}>
                    <CheckBox
                      id={`${task.id}`}
                      label={label}
                      color="black"
                      onClickLabel={() => handleShowPopup(task.id)}
                      checked={task.done}
                      readOnly
                    >
                      <p>
                        {task.description}
                      </p>
                    </CheckBox>
                    <button className="ic-remove" onClick={() => handleDeleteTask(task.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                );
              }) : (
                <div id="empty-list">
                  <h4>Lista vazia...</h4>
                </div>
              )
            }
          </div>
        </main>
      </div>
      {
        showPopup && (
          <ModalView
            isOpen={showPopup}
            title="Adicionar Tarefa"
          >
            <form>
              <CheckBox
                label="Finalizado"
                onChange={(e) => setDone(e.target.checked)}
                checked={done}
              />

              <Input
              label="Título"
              placeholder="Digíte o Título"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              />

              <Input
              label="Descrição"
              placeholder="Digíte a Descrição"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              />

              <Input
              label="Horário"
              type="time"
              defaultValue={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              />

              <Input
              label="Data"
              type="date"
              defaultValue={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              />

              <Button
                name="Cadastrar"
                onClick={handleSubmitTaskData}
              />

              <div className="modal-space-divisor" />

              <Button
                className="margin-top-10"
                name="Fechar"
                color="white"
                size="small"
                onClick={() => handleShowPopup()}
              />
            </form>
          </ModalView>
        )
      }
    </Container>
  );
};

export default DashBoard;
