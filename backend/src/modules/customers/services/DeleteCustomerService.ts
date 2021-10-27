import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    // Repositório dos clientes
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Serviço para remover um clientes pelo seu ID
  public async execute(id: string): Promise<string> {
    // Verificando se o cliente existe antes de apagar
    const customerToDelete = await this.customersRepository.findById(id);

    if (!customerToDelete) {
      throw new AppError('Customer not found.', 404);
    }

    // Apagando o cliente
    const responseMessage = await this.customersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteCustomerService;
