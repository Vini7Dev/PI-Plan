import { Request, Response } from 'express';

class OrdersController {
  // Listando todos os pedidos
  public async get(request: Request, response: Response): Promise<Response> {
    throw new Error('not implemented.');
  }

  // Cadastrando um novo pedido
  public async create(request: Request, response: Response): Promise<Response> {
    throw new Error('not implemented.');
  }

  // Atualizando os dados de um pedido
  public async update(request: Request, response: Response): Promise<Response> {
    throw new Error('not implemented.');
  }

  // Apagando um pedido
  public async delete(request: Request, response: Response): Promise<Response> {
    throw new Error('not implemented.');
  }
}

export default OrdersController;
