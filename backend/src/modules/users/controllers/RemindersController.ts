import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAdminRemindersByDateService from '../services/admin/ListAdminRemindersByDateService';

class RemindersController {
  public async get(request: Request, response: Response): Promise<Response> {
    // Recuperando a data de comparação para os lembretes na requisição
    const { date } = request.params;

    // Instanciando o serviço para a listagem dos lembretes
    const listAdminRemindersByDateService = container.resolve(ListAdminRemindersByDateService);

    const result = await listAdminRemindersByDateService.execute(date);

    return response.json(result);
  }
}

export default RemindersController;
