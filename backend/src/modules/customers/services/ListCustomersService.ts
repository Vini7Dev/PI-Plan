import { inject, injectable } from 'tsyringe';

import Customer from '../typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListCustomersService {
  constructor(
    // Repositório dos clientes
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Serviço para listar os clientes cadastrados
  public async execute(search_string = ''): Promise<Customer[]> {
    const customersList = await this.customersRepository.list(search_string);

    return customersList;
  }
}

export default ListCustomersService;
