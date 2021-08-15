import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '../services/CreateCustomerService';
import ListCustomersService from '../services/ListCustomersService';

class CustomersController {
  // Listando todos os clientes cadastrados
  public async get(request: Request, response: Response): Promise<Response> {
    // Executando o serviço para criação do cliente
    const listCustomersService = container.resolve(ListCustomersService);

    const customersList = await listCustomersService.execute();

    return response.json(customersList);
  }

  // Cadastrando um novo cliente
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados para a criação no corpo da requisição
    const {
      send_contact_alert,
      name,
      phone,
      document,
      last_contact_date,
      next_contact_date,
    } = request.body;

    // Executando o serviço para criação do cliente
    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute({
      send_contact_alert,
      name,
      phone,
      document,
      last_contact_date,
      next_contact_date,
    });

    return response.status(201).json(customer);
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
