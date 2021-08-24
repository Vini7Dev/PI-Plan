import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import Order from '../typeorm/entities/Order';

interface IOrdersRepository {
  findById(id: string): Promise<Order | undefined>;
  list(): Promise<Order[]>;
  create(data: ICreateOrderDTO): Promise<Order>;
  update(data: ICreateOrderDTO): Promise<Order>;
  delete(id: string): Promise<string>;
}

export default IOrdersRepository;
