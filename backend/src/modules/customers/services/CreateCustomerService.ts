import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Customer from '../entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  send_contact_alert: boolean;
  name: string;
  phone: string;
  document: string;
  next_contact_date: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    // Repositório dos clientes
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    send_contact_alert,
    name,
    phone,
    document,
    next_contact_date,
  }: IRequest): Promise<Customer> {
    // Verificando se já existe um cliente cadastrado com este documento
    const clientWithSameDocument = await this.customersRepository.findByDocument(document);

    if (clientWithSameDocument) {
      throw new AppError('This document is already registered.');
    }

    // Cadastrando o cliente no banco
    const customer = await this.customersRepository.create({
      send_contact_alert,
      name,
      phone,
      document,
      next_contact_date,
    });

    return customer;
  }
}

export default CreateCustomerService;
