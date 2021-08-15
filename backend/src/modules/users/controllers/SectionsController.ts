import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSectionService from '../services/user/CreateSectionService';

class SectionsController {
  // Criando uma nova sessão
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados de autenticação
    const { username, password } = request.body;

    // Executando o serviço para criar uma sessão
    const createSectionService = container.resolve(CreateSectionService);

    const {
      token,
      user,
    } = await createSectionService.execute({ username, password });

    return response.status(201).json({ token, user });
  }
}

export default SectionsController;
