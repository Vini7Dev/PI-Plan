import { inject, injectable } from 'tsyringe';

import Admin from '../../typeorm/entities/Admin';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import IHashProvider from '../../../../shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '../../../../shared/errors/AppError';

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
  ) {}

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
      throw new AppError('Admin not found.', 404);
    }

    // Confirmando se a senha informada é válida
    const passwordMatch = await this.hashProvider.compare(
      current_password, adminToUpdate.password,
    );

    if (!passwordMatch) {
      throw new AppError('The password does not match.', 401);
    }

    // Verificando se já existe um outro usuário cadastrado com esse username
    const adminWithSameUsername = await this.adminsRepository.findByUsername(
      username,
    );

    if (adminWithSameUsername && adminWithSameUsername.id !== id) {
      throw new AppError('This username already exits.');
    }

    const assemblerWithSameUsername = await this.assemblersRepository.findByUsername(
      username,
    );

    if (assemblerWithSameUsername) {
      throw new AppError('This username already exits.');
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
