import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomersService from '../services/ListCustomersService';
import UpdateCustomerService from '../services/UpdateCustomerService';

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
    // Recebendo os dados para atualizar um cliente
    const { id } = request.params;
    const {
      send_contact_alert,
      name,
      phone,
      document,
      last_contact_date,
      next_contact_date,
    } = request.body;

    // Serviço para a atualização dos dados do cliente
    const updateCustomerService = container.resolve(UpdateCustomerService);

    const customerUpdated = await updateCustomerService.execute({
      id,
      send_contact_alert,
      name,
      phone,
      document,
      last_contact_date,
      next_contact_date,
    });

    return response.status(201).json(customerUpdated);
  }

  // Apagando um cliente
  public async delete(request: Request, response: Response): Promise<Response> {
    // Recuperando o id do cliente na requisição
    const { id } = request.params;

    // Executando o serviço para apagar um cliente
    const deleteCustomerService = container.resolve(DeleteCustomerService);

    const responseMessage = await deleteCustomerService.execute(id);

    return response.json({ message: responseMessage });
  }
}

export default CustomersController;
