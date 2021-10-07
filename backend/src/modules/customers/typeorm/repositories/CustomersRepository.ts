import { getRepository, ILike, Repository } from 'typeorm';

import ICustomersRepository from '../../repositories/ICustomersRepository';
import Customer from '../entities/Customer';
import ICreateCustomerDTO from '../../dtos/ICreateCustomerDTO';
import IDatePropsDTO from '../../dtos/IDatePropsDTO';

class CustomersRepository implements ICustomersRepository {
    private repository: Repository<Customer>;

    constructor() {
      this.repository = getRepository(Customer);
    }

    // Buscando um cliente pelo id
    public async findById(id: string): Promise<Customer | undefined> {
      const customer = await this.repository.findOne(id, {
        relations: [
          'orders',
        ],
      });

      return customer;
    }

    // Buscando um cliente pelo documento
    public async findByDocument(document: string): Promise<Customer | undefined> {
      const customer = await this.repository.findOne({ document });

      return customer;
    }

    // Buscando os clientes que precisa emitir o alerta de contato em uma certa data
    public async findToSendAlertContactByDate({
      day,
      month,
      year,
    }: IDatePropsDTO): Promise<Customer[]> {
      const querryBuilderResult = await this.repository
        .createQueryBuilder()
        .select('customer')
        .from(Customer, 'customer')
        .where('customer.send_contact_alert = :value', { value: true })
        .andWhere('customer.next_contact_date < :date', { date: `${year}-${month}-${day}` })
        .getMany();

      return querryBuilderResult;
    }

    // Listando os clientees
    public async list(search_string?: string): Promise<Customer[]> {
      const customersList = await this.repository.find({
        where: [
          { name: ILike(`%${search_string}%`) },
          { phone: ILike(`%${search_string}%`) },
          { document: ILike(`%${search_string}%`) },
        ],
      });

      return customersList;
    }

    // Salvando um cliente no banco de dados
    public async create({
      send_contact_alert,
      name,
      phone,
      document,
      next_contact_date,
    }: ICreateCustomerDTO): Promise<Customer> {
      const createdCustomer = this.repository.create({
        send_contact_alert,
        name,
        phone,
        document,
        next_contact_date,
      });

      await this.repository.save(createdCustomer);

      return createdCustomer;
    }

    // Atualizando um cliente
    public async update({
      id,
      send_contact_alert,
      name,
      phone,
      document,
      next_contact_date,
    }: ICreateCustomerDTO): Promise<Customer> {
      const updatedCustomer = await this.repository.save({
        id,
        send_contact_alert,
        name,
        phone,
        document,
        next_contact_date,
      });

      return updatedCustomer;
    }

    // Apagando um cliente
    public async delete(id: string): Promise<string> {
      await this.repository.softDelete(id);

      return 'Cliente removido';
    }
}

export default CustomersRepository;
