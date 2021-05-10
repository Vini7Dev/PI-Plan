import { Request, Response } from 'express';
import ListAdminsService from '../../../services/admin/ListAdminsService';
import CreateAdminService from '../../../services/admin/CreateAdminService';
import UpdateAdminService from '../../../services/admin/UpdateAdminService';
import DeleteAdminService from '../../../services/admin/DeleteAdminService';

class AdminController {
  // Listando todos os administradores
  public async get(request: Request, response: Response): Promise<Response> {
    const listAdminsService = new ListAdminsService();

    const adminList = await listAdminsService.execute();

    return response.json(adminList);
  }

  // Criando um novo administrador
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, password, permission_create_admin } = request.body;

    const createAdminService = new CreateAdminService();

    const admin = await createAdminService.execute({
      name,
      username,
      password,
      permission_create_admin,
    });

    return response.status(201).json(admin);
  }

  // Atualizando um administrador
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, username, current_password, new_password } = request.body;

    const updateAdminService = new UpdateAdminService();

    const userUpdated = await updateAdminService.execute({
      id,
      name,
      username,
      current_password,
      new_password,
    });

    return response.status(201).json(userUpdated);
  }

  // Apagando um administrador
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdminService = new DeleteAdminService();

    await deleteAdminService.execute(id);

    return response.status(204).send();
  }
}

export default AdminController;
