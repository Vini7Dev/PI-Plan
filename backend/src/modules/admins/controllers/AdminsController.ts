import { Request, Response } from 'express';
import ListAdminsService from '../services/ListAdminsService';
import CreateAdminService from '../services/CreateAdminService';
import UpdateAdminService from '../services/UpdateAdminService';
import DeleteAdminService from '../services/DeleteAdminService';

class AdminsController {
  // Listando todos os administradores
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const listAdminsService = new ListAdminsService();

      const adminList = await listAdminsService.execute();

      return response.json(adminList);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Criando um novo administrador
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      // Recebendo os dados para a criação do administrador
      const {
        name,
        username,
        password,
        permission_create_admin,
      } = request.body;

      // Serviço para a criação do administrador
      const createAdminService = new CreateAdminService();

      const admin = await createAdminService.execute({
        name,
        username,
        password,
        permission_create_admin,
      });

      return response.status(201).json(admin);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Atualizando um administrador
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      // Recebendo os dados para atualizar os dados de um administrador
      const { id } = request.params;
      const {
        name,
        username,
        current_password,
        new_password,
      } = request.body;

      // Serviço para a atualização dos dados do montador
      const updateAdminService = new UpdateAdminService();

      const userUpdated = await updateAdminService.execute({
        id,
        name,
        username,
        current_password,
        new_password,
      });

      return response.status(201).json(userUpdated);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Apagando um administrador
  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      // Recebendo a referência do administrador que vai ser removido
      const { id } = request.params;

      // Serviço para a remoção do administrador
      const deleteAdminService = new DeleteAdminService();

      await deleteAdminService.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default AdminsController;
