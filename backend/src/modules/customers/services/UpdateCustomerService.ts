import { inject, injectable } from 'tsyringe';

import Customer from '../entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
    id: string;
    send_contact_alert: boolean;
    name: string;
    phone: string;
    document: string;
    last_contact_date: string;
    next_contact_date: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    // Repositório dos clientes
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Serviço para atualizar os dados de um cliente cadastrado
  public async execute({
    id,
    send_contact_alert,
    name,
    phone,
    document,
    last_contact_date,
    next_contact_date,
  }: IRequest): Promise<Customer> {
    // Conta do cliente que deve ser atualizada
    const customerToUpdate = await this.customersRepository.findById(id);

    // Verificando se o cliente existe
    if (!customerToUpdate) {
      throw new AppError('Customer not found.', 404);
    }

    // Verificando se já existe um outro cliente cadastrado com esse documento
    const customerWithSameDocument = await this.customersRepository.findByDocument(
      document,
    );

    if (customerWithSameDocument && customerWithSameDocument.id !== id) {
      throw new AppError('This document already exits.');
    }

    // Atualizando os dados do cliente no banco de dados
    customerToUpdate.name = name;
    customerToUpdate.send_contact_alert = send_contact_alert;
    customerToUpdate.name = name;
    customerToUpdate.phone = phone;
    customerToUpdate.document = document;
    customerToUpdate.last_contact_date = last_contact_date;
    customerToUpdate.next_contact_date = next_contact_date;

    const savedCustomer = await this.customersRepository.update(customerToUpdate);

    return savedCustomer;
  }
}

export default UpdateCustomerService;
