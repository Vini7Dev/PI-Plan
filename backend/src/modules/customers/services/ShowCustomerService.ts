import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../typeorm/entities/Customer';

@injectable()
class ShowCustomerService {
  constructor(
    // Repositório dos clientes
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Serviço para busca do cliente pelo id
  public async execute(id: string): Promise<Customer | undefined> {
    const findedCustomer = await this.customersRepository.findById(id);

    return findedCustomer;
  }
}

export default ShowCustomerService;
