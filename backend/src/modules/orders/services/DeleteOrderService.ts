import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IInstallationsRepository from '../../installations/repositories/IInstallationsRepository';
import IAssessmentsRepository from '../../assessments/repositories/IAssessmentsRepository';

@injectable()
class DeleteOrderService {
  constructor(
    // Repositório dos pedidos
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,
  ) { }

  // Serviço para apagar um pedido
  public async execute(id: string): Promise<string> {
    // Verificando se o pedido existe antes de apagar
    const orderToDelete = await this.ordersRepository.findById(id);

    if (!orderToDelete) {
      throw new AppError('Order not found.', 404);
    }

    // Verificando se o pedido tem alguma instalação associada
    if (orderToDelete.installation) {
      await this.installationsRepository.delete(orderToDelete.installation.id);
    }

    // Verificando se o pedido tem alguma avaliação de instalação associada
    if (orderToDelete.installation && orderToDelete.installation.assessment) {
      await this.assessmentsRepository.delete(orderToDelete.installation.assessment.id);
    }

    // Apagando o pedido
    const responseMessage = await this.ordersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteOrderService;
