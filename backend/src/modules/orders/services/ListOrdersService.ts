import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../typeorm/entities/Order';

@injectable()
class ListOrdersService {
  constructor(
    // Repositório dos pedidos
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Serviço para listagem dos pedidos
  public async execute(): Promise<Order[]> {
    const ordersList = await this.ordersRepository.list();

    return ordersList;
  }
}

export default ListOrdersService;
