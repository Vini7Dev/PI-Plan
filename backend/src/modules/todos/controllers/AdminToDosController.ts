import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAdminToDosService from '../services/ListAdminToDosService';

class AdminToDosController {
  public async get(request: Request, response: Response): Promise<Response> {
    // Recuperando o id do administrador salvo na requisição
    const { id } = request.user;

    // Instanciando o serviço para listagem das tarefas do administrador
    const listAdminToDosService = container.resolve(ListAdminToDosService);

    const toDosList = await listAdminToDosService.execute(id);

    return response.json(toDosList);
  }
}

export default AdminToDosController;
