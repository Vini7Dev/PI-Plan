import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '../services/CreateOrderService';
import DeleteOrderService from '../services/DeleteOrderService';
import ListOrdersService from '../services/ListOrdersService';
import ShowOrderService from '../services/ShowOrderService';
import UpdateOrderService from '../services/UpdateOrderService';

class OrdersController {
  // Buscando um pedido pelo id
  public async show(request: Request, response: Response): Promise<Response> {
    // Recuperando o id do pedido nos parâmetros da requisição
    const { id } = request.params;

    // Executando o serviço para busca do pedido
    const showOrderService = container.resolve(ShowOrderService);

    const findedOrder = await showOrderService.execute(id);

    return response.json(findedOrder);
  }

  // Listando todos os pedidos
  public async get(request: Request, response: Response): Promise<Response> {
    // Recuperando a string para busca
    const { search_string } = request.body;

    // Executando o serviço de listagem dos pedidos
    const listOrdersService = container.resolve(ListOrdersService);

    const ordersList = await listOrdersService.execute(search_string);

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
      furniture_delivery_forecast,
      payment_method,
      gross_value,
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
      furniture_delivery_forecast,
      payment_method,
      gross_value,
      expenses_value,
    });

    return response.status(201).json(createdOrder);
  }

  // Atualizando os dados de um pedido
  public async update(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados do pedido no corpo da requisição e na rota
    const { id } = request.params;
    const {
      address,
      current_status,
      current_proccess,
      title,
      description,
      installation_environments,
      start_date,
      end_date,
      furniture_delivery_forecast,
      payment_method,
      gross_value,
      expenses_value,
    } = request.body;

    // Executando o serviço para atualizar os dados do pedido
    const updateOrderService = container.resolve(UpdateOrderService);

    const updatedOrder = await updateOrderService.execute({
      id,
      address,
      current_status,
      current_proccess,
      title,
      description,
      installation_environments,
      start_date,
      end_date,
      furniture_delivery_forecast,
      payment_method,
      gross_value,
      expenses_value,
    });

    return response.status(201).json(updatedOrder);
  }

  // Apagando um pedido
  public async delete(request: Request, response: Response): Promise<Response> {
    // Recuperando o id do pedido nos parâmetros da requisição
    const { id } = request.params;

    // Executando o serviço para remoção do pedido
    const deleteOrderService = container.resolve(DeleteOrderService);

    const responseMessage = await deleteOrderService.execute(id);

    return response.json({ message: responseMessage });
  }
}

export default OrdersController;
