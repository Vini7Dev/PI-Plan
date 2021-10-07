import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import IDatePropsDTO from '../dtos/IDatePropsDTO';
import Customer from '../typeorm/entities/Customer';

interface ICustomersRepository {
  findById(id: string): Promise<Customer | undefined>;
  findByDocument(document: string): Promise<Customer | undefined>;
  findToSendAlertContactByDate(dateComparation: IDatePropsDTO): Promise<Customer[]>;
  list(search_string?: string): Promise<Customer[]>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  update(data: ICreateCustomerDTO): Promise<Customer>;
  delete(id: string): Promise<string>;
}

export default ICustomersRepository;
