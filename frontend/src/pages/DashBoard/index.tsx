import React, { useState , useCallback, useRef } from 'react';
import Carousel from 'react-elastic-carousel';
import { FiTrash2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import { useAuth } from '../../contexts/Authentication';
import getValidationErrors from '../../utils/validationErrors';
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

interface IReminderProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  reminder_type: 'order' | 'installation' | 'contact_alert';
}

interface IRemindersResponse {
  contact_alerts: IReminderProps[];
  orders: IReminderProps[];
  installations: IReminderProps[];
}

interface ITaskProps {
  id: string;
  done: boolean;
  title: string;
  description: string;
}

// Página inicial do site
const DashBoard: React.FC = () =>{
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [reminders, setReminders] = useState<IReminderProps[]>([]);
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [taskId, setTaskId] = useState('');
  const [taskDone, settaskDone] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Configurando os break points do carrossel de lembretes
  const breakPoints = [
    { width: 180, itemsToShow: 1 },
    { width: 360, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 720, itemsToShow: 4 },
  ];

  // Função para apresentar o modal com os dados de uma tarefa
  const toggleShowPopup = useCallback(async (id?: string) => {
    // Alterando a apresentação do popup
    setShowPopup(!showPopup);

    // Caso tenha informado o id da tarefa, buscar os seus respectivos dados do back-end
    if(id) {
      // Recuprando os dados da tarefa no back-end
      const { data: taskData } = await api.get<ITaskProps>(`/todos/${id}`);

      // Salvando os dados da tarefa
      setTaskId(taskData.id);
      settaskDone(taskData.done);
      setTaskTitle(taskData.title);
      setTaskDescription(taskData.description);
    } else {
      // Limpando o id e os inputs dos formulários
      setTaskId('');
      settaskDone(false);
      setTaskTitle('');
      setTaskDescription('');
    }
  }, [showPopup]);

  // Função para buscar as tarefas cadastradas
  const handleLoadTasks = useCallback(async () => {
    const tasksLoaded = await api.get<ITaskProps[]>('/admin-todos');

    setTasks(tasksLoaded.data);
  }, []);

  // Função para cadastrar uma nova tarefa
  const handleSubmitTaskData = useCallback(async (data) => {
    try {
      // Criando o modelo para validação do formulário
      const shape = Yup.object().shape({
        done: Yup.boolean().required(),
        title: Yup.string().max(45, 'Informe no máximo 45 letras!').required(),
        description: Yup.string().max(100, 'Informe no máximo 100 letras!').required(),
      });

      // Criando o objeto da tarefa sem o id do administrador
      const taskData = {
        done: taskDone,
        title: data.title,
        description: data.description,
      };

      // Validando o formulário
      await shape.validate(taskData);

      // Verificando se o id da tarefa está presente, caso sim, atualizar os seus dados
      if(taskId) {
          // Atualizando os dados da tarefa
          await api.put(`/todos/${taskId}`, taskData);
      } else {
        // Adicionando o atributo admin_id nos dados da tarefa
        Object.assign(taskData, { admin_id: user.id });

        // Cadastrando a nova tarefa
        await api.post('/todos', taskData);
      }

      // Recarregando a lista de tarefas
      handleLoadTasks();

      // Fechando o popup
      toggleShowPopup();
    } catch(error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if(error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        if(formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }
  },[user, taskId, taskDone, handleLoadTasks, toggleShowPopup]);

  // Função para apagar uma tarefa
  const handleDeleteTask = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar a tarefa
    const response = confirm('Você realmente deseja apagar a terefa?');

    if(response) {
      // Enviando uma requisição para apagar a tarefa
      await api.delete(`/todos/${id}`);

      // Atualizando a listagem das tarefas
      handleLoadTasks();
    }
  }, [handleLoadTasks]);

  // Função para buscar os lembretes do dia
  const handleLoadReminders = useCallback(async () => {
    // Recuperando a data de hoje
    const currentDate = new Date();
    const day = (currentDate.getDate()).toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    // Buscando os lembretes da api
    const { data: remindersList } = await api.get<IRemindersResponse>(`/reminders/${day}-${month}-${year}`);

    // Formatando o retorno da api para uma lista única
    const remindersFormatedList: IReminderProps[] = [];

    remindersList.contact_alerts.forEach(contact_alert => {
      const reminderWithCardType = Object.assign(contact_alert, { reminder_type: 'contact_alert' });
      remindersFormatedList.push(reminderWithCardType);
    });

    remindersList.orders.forEach(order => {
      const reminderWithCardType = Object.assign(order, { reminder_type: 'order' });
      remindersFormatedList.push(reminderWithCardType)
    });

    remindersList.installations.forEach(installation => {
      const reminderWithCardType = Object.assign(installation, { reminder_type: 'installation' });
      remindersFormatedList.push(reminderWithCardType)
    });

    // Salvando a lista de lembretes no estado
    setReminders(remindersFormatedList);

    // Buscando as tarefas
    handleLoadTasks();
  }, [handleLoadTasks]);

  return(
    <Container onLoad={handleLoadReminders}>
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
            {
              reminders.length > 0
                ? reminders.map((reminder) => (
                  <ReminderItem
                    key={reminder.id}
                    id={reminder.id}
                    title={reminder.title}
                    subtitle={reminder.subtitle}
                    description={reminder.description}
                    reminder_type={reminder.reminder_type}
                  />))
                : <p id="empty-reminders-list">Sem lembretes...</p>
            }
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
            <Form
              ref={formRef}
              onSubmit={handleSubmitTaskData}
            >
              <CheckBox
                label="Finalizado"
                name="done"
                onChange={(e) => settaskDone(e.target.checked)}
                checked={taskDone}
              />

              <Input
              label="Título"
              name="title"
              placeholder="Digíte o Título"
              defaultValue={taskTitle}
              />

              <Input
              label="Descrição"
              name="description"
              placeholder="Digíte a Descrição"
              defaultValue={taskDescription}
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
