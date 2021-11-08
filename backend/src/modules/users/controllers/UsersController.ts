import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SearchUserService from '../services/user/SearchUserService';

class UsersController {
  public async get(request: Request, response: Response): Promise<Response> {
    // Recuperando o parâmetro de pesquisa nos querry params
    const { search_string } = request.query as { search_string?: string };

    // Instanciando o serviço para busca
    const searchUserService = container.resolve(SearchUserService);

    const usersList = await searchUserService.execute(search_string);

    return response.json(usersList);
  }
}

export default UsersController;
