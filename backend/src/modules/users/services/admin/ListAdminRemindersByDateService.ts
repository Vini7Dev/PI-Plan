import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../../../customers/repositories/ICustomersRepository';
import IInstallationsRepository from '../../../installations/repositories/IInstallationsRepository';
import IOrdersRepository from '../../../orders/repositories/IOrdersRepository';

interface IResponse {
  type: 'contact_alert' | 'order' | 'installation';
  title: string;
  subtitle: string;
  description: string;
}

@injectable()
class ListAdminRemindersByDateService {
  constructor(
    // Repositórios de clientes, pedidos e instalações
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  public async execute(date: string): Promise<IResponse[]> {
    throw new Error('Method not implemented.');
  }
}

export default ListAdminRemindersByDateService;
