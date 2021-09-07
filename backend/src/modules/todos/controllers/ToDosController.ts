import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateToDosService from '../services/CreateToDosService';
import DeleteToDosService from '../services/DeleteToDosServices';
import UpdateToDosService from '../services/UpdateToDosService';
import ListToDosService from '../services/ListToDosService';
import ShowToDoService from '../services/ShowToDoService';

class ToDosController {
  // Buscando por uma tarefa pelo id
  public async show(request: Request, response: Response): Promise<Response> {
    // Recuperando o id da tarefa nos parâmetros da requisição
    const { id } = request.params;

    // Executando o serviço para buscar a tarefa
    const showToDoService = container.resolve(ShowToDoService);
    const showToDo = await showToDoService.execute(id);

    return response.json(showToDo);
  }

  // Listando todas as tarefas salvas
  public async get(request: Request, response: Response): Promise<Response> {
    // Executando o serviço para listagem das tarefas
    const listToDosService = container.resolve(ListToDosService);

    const toDoList = await listToDosService.execute();

    return response.json(toDoList);
  }

  // Cadastrando uma nova tarefa
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados para a criação no corpo da requisição
    const {
      admin_id,
      done,
      title,
      description,
    } = request.body;

    // Executando o serviço para criação da tarefa
    const createToDoService = container.resolve(CreateToDosService);

    const todoCreated = await createToDoService.execute({
      admin_id,
      done,
      title,
      description,
    });

    return response.status(201).json(todoCreated);
  }

  // Atualizando os dados de uma tarefa salva
  public async update(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados da tarefa na requisição
    const { id } = request.params;
    const {
      done,
      title,
      description,
    } = request.body;

    // Serviço para a atualização dos dados da tarefa
    const updateToDosService = container.resolve(UpdateToDosService);

    const toDoUpdated = await updateToDosService.execute({
      id,
      done,
      title,
      description,
    });

    return response.status(201).json(toDoUpdated);
  }

  // Apagando uma tarefa
  public async delete(request: Request, response: Response): Promise<Response> {
    // Recuperando o id da tarefa na requisição
    const { id } = request.params;

    // Executando o serviço para apagar uma tarefa
    const deleteToDosService = container.resolve(DeleteToDosService);

    const responseMessage = await deleteToDosService.execute(id);

    return response.json({ message: responseMessage });
  }
}

export default ToDosController;
