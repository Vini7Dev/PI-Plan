import { inject, injectable } from 'tsyringe';
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
    const responseMessage = await this.ordersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteOrderService;
