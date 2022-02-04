import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IInstallationsRepository from '../../installations/repositories/IInstallationsRepository';

@injectable()
class DeleteOrderService {
  constructor(
    // Repositório dos pedidos
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) { }

  // Serviço para apagar um pedido
  public async execute(id: string): Promise<string> {
    // Verificando se o pedido existe antes de apagar
    const orderToDelete = await this.ordersRepository.findById(id);

    if (!orderToDelete) {
      throw new AppError('Order not found.', 404);
    }

    // Verificando se o pedido tem alguma instalação associada
    if (orderToDelete.installation && orderToDelete.installation.id) {
      await this.installationsRepository.delete(orderToDelete.installation.id);
    }

    // Apagando o pedido
    const responseMessage = await this.ordersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteOrderService;
