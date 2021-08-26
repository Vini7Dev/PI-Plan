import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    // Repositório dos pedidos
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Serviço para apagar um pedido
  public async execute(id: string): Promise<string> {
    // Verificando se o pedido existe antes de apagar
    const orderToDelete = await this.ordersRepository.findById(id);

    if (!orderToDelete) {
      throw new AppError('Order not found.', 404);
    }

    // Apagando o pedido
    const responseMessage = await this.ordersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteOrderService;
