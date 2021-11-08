import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../typeorm/entities/Order';

@injectable()
class ShowOrderService {
  constructor(
    // Repositório dos pedidos
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Serviço para busca do pedido pelo id
  public async execute(id: string): Promise<Order | undefined> {
    const findedOrder = await this.ordersRepository.findById(id);

    return findedOrder;
  }
}

export default ShowOrderService;
