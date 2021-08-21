import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../services/CreateOrderService';
import ListOrdersService from '../services/ListOrdersService';

class OrdersController {
  // Listando todos os pedidos
  public async get(request: Request, response: Response): Promise<Response> {
    // Executando o serviço de listagem dos pedidos
    const listOrdersService = container.resolve(ListOrdersService);

    const ordersList = await listOrdersService.execute();

    return response.json(ordersList);
  }

  // Cadastrando um novo pedido
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados do pedido no corpo da requisição
    const {
      customer_id,
      address,
      current_status,
      current_proccess,
      title,
      description,
      installation_environments,
      start_date,
      end_date,
      mobile_delivery_forecast,
      payment_method,
      net_value,
      expenses_value,
    } = request.body;

    // Executando o serviço de criação do pedido
    const createOrderService = container.resolve(CreateOrderService);

    const createdOrder = await createOrderService.execute({
      customer_id,
      address,
      current_status,
      current_proccess,
      title,
      description,
      installation_environments,
      start_date,
      end_date,
      mobile_delivery_forecast,
      payment_method,
      net_value,
      expenses_value,
    });

    return response.status(201).json(createdOrder);
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
