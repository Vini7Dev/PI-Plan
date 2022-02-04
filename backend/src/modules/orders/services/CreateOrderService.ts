import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IDateProvider from '../../../shared/container/providers/DateProvider/models/IDateProvider';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';
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
  customer_id: string;
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
class CreateOrderService {
  constructor(
    // Repositório dos pedidos e dos cliente
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    // Provetor para trabalhar com datas
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  // Serviço para cadastrar um pedido
  public async execute({
    customer_id,
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

    // Verificar se o cliente está cadastrado
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    // Verifica se o documento do cliente já está cadastrado
    if (!customer.document) {
      throw new AppError('Customer document not registered.');
    }

    // Cadastrando o pedido no banco
    const orderCreated = await this.ordersRepository.create({
      customer_id,
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
    });

    // Desable customer send contact alert
    customer.send_contact_alert = false;

    await this.customersRepository.update(customer);

    return orderCreated;
  }
}

export default CreateOrderService;
