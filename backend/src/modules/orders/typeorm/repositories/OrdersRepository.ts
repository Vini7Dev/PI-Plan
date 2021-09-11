import { getRepository, Repository } from 'typeorm';
import ICreateOrderDTO from '../../dtos/ICreateOrderDTO';
import IOrdersRepository from '../../repositories/IOrdersRepository';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  // Buscando um pedido pelo id
  public async findById(id: string): Promise<Order | undefined> {
    const findedOrder = await this.repository.findOne(id, {
      relations: ['address'],
    });

    return findedOrder;
  }

  // Listando todos os pedidos em andamento
  public async listInProgress(): Promise<Order[]> {
    const inProgressOrders = await this.repository.find({
      where: { current_status: 0 },
    });

    return inProgressOrders;
  }

  // Listando todos os pedidos
  public async list(): Promise<Order[]> {
    const ordersList = await this.repository.find({
      relations: ['address'],
    });

    return ordersList;
  }

  // Cadastrando um novo pedido
  public async create({
    customer_id,
    address,
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
  }: ICreateOrderDTO): Promise<Order> {
    const createdOrder = this.repository.create({
      customer_id,
      address,
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

    await this.repository.save(createdOrder);

    return createdOrder;
  }

  // Atualizando um pedido
  public async update({
    id,
    address,
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
  }: ICreateOrderDTO): Promise<Order> {
    const updatedOrder = await this.repository.save({
      id,
      address,
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

    return updatedOrder;
  }

  // Apagando um pedido
  public async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);

    return 'Pedido apagado';
  }
}

export default OrdersRepository;
