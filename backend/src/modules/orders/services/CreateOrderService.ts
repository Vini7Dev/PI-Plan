import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Address from '../typeorm/entities/Address';
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
  mobile_delivery_forecast?: string;
  payment_method: string;
  net_value: number;
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
  ) {}

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
    mobile_delivery_forecast,
    payment_method,
    net_value,
    expenses_value,
  }: IRequest): Promise<Order> {
    // Verificar se o cliente está cadastrado
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    // Verifica se o documento do cliente já está cadastrado
    if (!customer.document) {
      throw new AppError('Customer document not registered.');
    }

    // Criando o objeto de endereço
    const address = new Address();
    address.cep = cep;
    address.street = street;
    address.number = number;
    address.complement = complement;
    address.district = district;
    address.city = city;
    address.uf = uf;
    address.country = country;

    // Cadastrando o pedido no banco
    const orderCreated = await this.ordersRepository.create({
      customer_id,
      address,
      current_status,
      current_proccess,
      title,
      description,
      installation_environments,
      start_date,
      end_date,
      mobile_delivery_forecast,
      payment_method,
      net_value,
      expenses_value,
    });

    return orderCreated;
  }
}

export default CreateOrderService;
