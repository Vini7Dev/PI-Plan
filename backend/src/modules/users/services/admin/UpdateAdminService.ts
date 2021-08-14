import { inject, injectable } from 'tsyringe';

import AdminsRepository from '../../repositories/implementations/AdminsRepository';
import Admin from '../../entities/Admin';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import AssemblersRepository from '../../repositories/implementations/AssemblersRepository';
import IHashProvider from '../../../../shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
    id: string;
    name: string;
    username: string;
    current_password: string;
    new_password?: string;
}

@injectable()
class UpdateAdminService {
  constructor(
    // Repositório dos administradores e dos montadores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    // Inicializando o repositório dos administradores e dos montadores
    this.adminsRepository = new AdminsRepository();
    this.assemblersRepository = new AssemblersRepository();
  }

  // Serviço para atualizar os dados de um administrador cadastrado
  public async execute({
    id,
    name,
    username,
    new_password,
    current_password,
  }: IRequest): Promise<Admin> {
    // Conta do administrador que deve ser atualizada
    const adminToUpdate = await this.adminsRepository.findById(id);

    // Verificando se o administrador existe
    if (!adminToUpdate) {
      throw new Error('Admin not found.');
    }

    // Confirmando se a senha informada é válida
    const passwordMatch = await this.hashProvider.compare(
      current_password, adminToUpdate.password,
    );

    if (!passwordMatch) {
      throw new Error('The password does not match.');
    }

    // Verificando se já existe um usuário cadastrado com esse username
    const adminWithSameUsername = await this.adminsRepository.findByUsername(
      username,
    );

    const assemblerWithSameUsername = await this.assemblersRepository.findByUsername(
      username,
    );

    if (adminWithSameUsername || assemblerWithSameUsername) {
      throw new Error('This username already exits.');
    }

    // Atualizando os dados do administrador no banco de dados
    adminToUpdate.name = name;
    adminToUpdate.username = username;
    if (new_password) {
      adminToUpdate.password = await this.hashProvider.generate(new_password);
    }

    const savedAdmin = await this.adminsRepository.update(adminToUpdate);

    return savedAdmin;
  }
}

export default UpdateAdminService;
