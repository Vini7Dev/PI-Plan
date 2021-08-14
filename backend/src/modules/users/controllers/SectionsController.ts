import { Request, Response } from 'express';

class SectionsController {
  // Criando uma nova sessão
  public async create(request: Request, response: Response): Promise<Response> {
    return response.status(201).json({ message: 'Create section.' });
  }
}

export default SectionsController;
