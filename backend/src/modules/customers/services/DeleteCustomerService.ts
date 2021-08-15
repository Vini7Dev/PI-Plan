import { inject, injectable } from 'tsyringe';

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
    const responseMessage = await this.customersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteCustomerService;
