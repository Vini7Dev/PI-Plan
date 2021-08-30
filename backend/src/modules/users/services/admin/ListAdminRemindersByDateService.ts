import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../../../customers/repositories/ICustomersRepository';
import IInstallationsRepository from '../../../installations/repositories/IInstallationsRepository';
import IOrdersRepository from '../../../orders/repositories/IOrdersRepository';
import Order from '../../../orders/typeorm/entities/Order';

interface IReminderItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

interface IResponse {
  contact_alerts: IReminderItem[];
  orders: IReminderItem[];
  installations: IReminderItem[];
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

  public async execute(date: string): Promise<IResponse> {
    const [stringDay, stringMonth, stringYear] = date.split('-');

    const contactAlertsCustomers = await this.customersRepository.findToSendAlertContactByDate({
      day: Number(stringDay),
      month: Number(stringMonth),
      year: Number(stringYear),
    });

    const odersInProgress = await this.ordersRepository.listInProgress();

    const installationsInProgress = await this.installationsRepository.listInProgress();

    // Removendo os pedidos que possuem instalação em andamento
    const ordersWithoutInstallation: Order[] = [];

    odersInProgress.forEach((order) => {
      const indexFinded = installationsInProgress.findIndex(
        (installation) => installation.order_id === order.id,
      );

      if (indexFinded === -1) {
        ordersWithoutInstallation.push(order);
      }
    });

    // Montando o objeto de resposta
    const contact_alerts = contactAlertsCustomers.map((customer) => ({
      id: customer.id,
      title: customer.name,
      subtitle: customer.next_contact_date,
      description: customer.phone,
    }));

    const orders = ordersWithoutInstallation.map((order) => ({
      id: order.id.toString(),
      title: order.title.toString(),
      subtitle: order.current_proccess.toString(),
      description: order.description.toString(),
    }));

    const installations = installationsInProgress.map((installation) => ({
      id: installation.id,
      title: installation.order.title,
      subtitle: installation.completion_forecast,
      description: installation.order.description,
    }));

    return {
      orders,
      installations,
      contact_alerts,
    };
  }
}

export default ListAdminRemindersByDateService;
