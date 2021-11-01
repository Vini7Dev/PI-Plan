import React, { useState , useCallback } from 'react';
import Carousel from 'react-elastic-carousel';
import { FiTrash2 } from 'react-icons/fi';
import { Form } from '@unform/web';

import api from '../../services/api';
import {
  Container, TasksList, AddTaskButton
} from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalView from '../../components/ModalView';

import ReminderItem from '../../components/ReminderItem';

interface ITaskProps {
  id: string;
  done: boolean;
  title: string;
  description: string;
  task_date: string;
}

// Página inicial do site
const DashBoard: React.FC = () =>{
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [done, setDone] = useState(false);

  // Configurando os break points do carrossel de lembretes
  const breakPoints = [
    { width: 180, itemsToShow: 1 },
    { width: 360, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 720, itemsToShow: 4 },
  ];

  // Função para apresentar o modal com os dados de uma tarefa
  const toggleShowPopup = useCallback((id?: string) => {
    setShowPopup(!showPopup);

    if(id) {
      setTaskId(id);
      const request = new XMLHttpRequest();

      request.open('GET', `http://localhost:8080/tasks/${id}`, true);

      request.onload = function() {
        const taskData = JSON.parse(this.response);

        const taskDateTime = taskData.task_date.split(/t+/i);
      }

      request.send();
    } else {
      setTaskId('');
      setDone(false);
    }
  }, [showPopup]);

  // Função para buscar as tarefas cadastradas
  const handleLoadTasks = useCallback(async () => {
    const tasksLoaded = await api.get<ITaskProps[]>('/admin-todos');

    console.log(tasksLoaded.data);

    setTasks(tasksLoaded.data);
  }, []);

  // Função para cadastrar uma nova tarefa
  const handleSubmitTaskData = useCallback(() => {
    //
  },[]);

  // Função para apagar uma tarefa
  const handleDeleteTask = useCallback((id: string) => {
    //
  }, []);

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
              <AddTaskButton>
                <button>Tarefas</button>
              </AddTaskButton>
            </div>
            <div className="size1">
              <AddTaskButton>
                <button onClick={() => toggleShowPopup()}>Adicionar</button>
              </AddTaskButton>
            </div>
          </div>
          <TasksList>
            {
              tasks.length ?  tasks.map(task => (
                  <div className="task-item" key={task.id}>
                    <button className="item-data" onClick={() => toggleShowPopup(task.id)}>
                      <input
                        type="checkbox"
                        name={task.id}
                        checked={task.done}
                        readOnly
                      />
                      <div>
                        <label htmlFor={task.id}>
                          {task.title}
                        </label>
                        <p className="task-description">
                          {task.description}
                        </p>
                      </div>
                    </button>
                    <button className="ic-remove" onClick={() => handleDeleteTask(task.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                )) : (
                <div id="empty-list">
                  <h4>Lista vazia...</h4>
                </div>
              )
            }
          </TasksList>
        </main>
      </div>
      {
        showPopup && (
          <ModalView
            isOpen={showPopup}
            title="Adicionar Tarefa"
          >
            <Form onSubmit={handleSubmitTaskData}>
              <CheckBox
                label="Finalizado"
                name="done"
                onChange={(e) => setDone(e.target.checked)}
                checked={done}
              />

              <Input
              label="Título"
              name="title"
              placeholder="Digíte o Título"
              />

              <Input
              label="Descrição"
              name="description"
              placeholder="Digíte a Descrição"
              />

              <Input
              label="Horário"
              name="time"
              type="time"
              />

              <Input
              label="Data"
              name="date"
              type="date"
              />

              <Button
                name="Cadastrar"
                type="submit"
              />

              <div className="modal-space-divisor" />

              <Button
                className="margin-top-10"
                name="Fechar"
                color="white"
                size="small"
                onClick={() => toggleShowPopup()}
              />
            </Form>
          </ModalView>
        )
      }
    </Container>
  );
};

export default DashBoard;
