import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../typeorm/entities/Customer';

interface ICustomersRepository {
  findById(id: string): Promise<Customer | undefined>;
  findByDocument(document: string): Promise<Customer | undefined>;
  findToSendAlertContactByDate(dateComparation: Date): Promise<Customer[]>;
  list(): Promise<Customer[]>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  update(data: ICreateCustomerDTO): Promise<Customer>;
  delete(id: string): Promise<string>;
}

export default ICustomersRepository;
