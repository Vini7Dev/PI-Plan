import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IDateProvider from '../../../shared/container/providers/DateProvider/models/IDateProvider';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../typeorm/entities/Order';

interface IAddress {
  cep: string;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  uf: string;
  country: string;
}

interface IRequest {
  id: string;
  address: IAddress;
  current_status: number;
  current_proccess: number;
  title: string;
  description: string;
  installation_environments: string;
  start_date: string;
  end_date?: string;
  furniture_delivery_forecast?: string;
  payment_method: string;
  gross_value: number;
  expenses_value: number;
}

@injectable()
class UpdateOrderService {
  constructor(
    // Repositório dos pedidos
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    // Provetor para trabalhar com datas
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  // Serviço para atualizar os dados de um pedido
  public async execute({
    id,
    address: {
      cep, street, number, complement, district, city, uf, country,
    },
    current_status,
    current_proccess,
    title,
    description,
    installation_environments,
    start_date,
    end_date,
    furniture_delivery_forecast,
    payment_method,
    gross_value,
    expenses_value,
  }: IRequest): Promise<Order> {
    // Verificar se a data de início é menor que a de finalização
    if (end_date) {
      const startDateParsed = this.dateProvider.parseStringDate(start_date);
      const endDateParsed = this.dateProvider.parseStringDate(end_date);
      const startDateIsBefore = this.dateProvider.isBefore(startDateParsed, endDateParsed);

      if (!startDateIsBefore) {
        throw new AppError('Start date must be before than end date.');
      }
    }

    // Verificando se o pedido existe
    const orderToUpdate = await this.ordersRepository.findById(id);

    if (!orderToUpdate) {
      throw new AppError('Order not found.', 404);
    }

    // Atualizando os dados do endereço
    const { address } = orderToUpdate;
    address.cep = cep;
    address.street = street;
    address.number = number;
    address.complement = complement;
    address.district = district;
    address.city = city;
    address.uf = uf;
    address.country = country;

    // Atualizando os dados do pedido
    orderToUpdate.address = address;
    orderToUpdate.current_status = current_status;
    orderToUpdate.current_proccess = current_proccess;
    orderToUpdate.title = title;
    orderToUpdate.description = description;
    orderToUpdate.installation_environments = installation_environments;
    orderToUpdate.start_date = start_date;
    orderToUpdate.end_date = end_date || '';
    orderToUpdate.furniture_delivery_forecast = furniture_delivery_forecast || '';
    orderToUpdate.payment_method = payment_method;
    orderToUpdate.gross_value = gross_value;
    orderToUpdate.expenses_value = expenses_value;

    // Salvando os dados atualizados
    const updatedOrder = await this.ordersRepository.update(orderToUpdate);

    return updatedOrder;
  }
}

export default UpdateOrderService;
