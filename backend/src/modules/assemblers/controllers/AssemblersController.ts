import { Request, Response } from 'express';

class AssemblersController {
  // Listando todos os montadores
  public async get(request: Request, response: Response): Promise<Response> {
    return response.send();
  }

  // Cadastrando um novo montador
  public async create(request: Request, response: Response): Promise<Response> {
    return response.send();
  }

  // Atualizando os dados do montador
  public async update(request: Request, response: Response): Promise<Response> {
    return response.send();
  }

  // Apagando um montador
  public async delete(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}

export default AssemblersController;
