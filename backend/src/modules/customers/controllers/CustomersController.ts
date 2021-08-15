import { Request, Response } from 'express';

class CustomersController {
  // Listando todos os clientes cadastrados
  public async get(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'customer get' });
  }

  // Cadastrando um novo cliente
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'customer post' });
  }

  // Atualizando os dados de um cliente
  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'customer update' });
  }

  // Apagando um cliente
  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'customer delete' });
  }
}

export default CustomersController;
