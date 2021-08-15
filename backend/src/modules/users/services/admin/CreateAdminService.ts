import { injectable, inject } from 'tsyringe';

import IAdminsRepository from '../../repositories/IAdminsRepository';
import Admin from '../../entities/Admin';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import IHashProvider from '../../../../shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '../../../../shared/errors/AppError';

interface IRequest {
    authenticated_user_id: string;
    name: string;
    username: string;
    password: string;
    permission_create_admin: boolean;
}

@injectable()
class CreateAdminService {
  constructor(
    // Repositório dos administradores e dos montadores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  // Serviço para a criação de um novo usuário administrador
  public async execute({
    authenticated_user_id,
    name,
    username,
    password,
    permission_create_admin,
  }: IRequest): Promise<Admin> {
    // Verificar se o administrador conectado tem permissão para realizar o cadastro
    const authenticated_user = await this.adminsRepository.findById(authenticated_user_id);

    if (!authenticated_user || !authenticated_user.permission_create_admin) {
      throw new AppError('User does not have permission to create another administrator.', 403);
    }

    // Verificando se já existe um usuario cadastrado com esse username
    const adminWithSameUsername = await this.adminsRepository.findByUsername(
      username,
    );

    if (adminWithSameUsername) {
      throw new AppError('This username already exits.');
    }

    const assemblerWithSameUsername = await this.assemblersRepository.findByUsername(
      username,
    );

    if (assemblerWithSameUsername) {
      throw new AppError('This username already exits.');
    }

    // Criptografando a senha do usuário
    const cryptedPassword = await this.hashProvider.generate(password);

    // Salvando o montador no banco de dados
    const savedAdmin = await this.adminsRepository.create({
      name,
      username,
      password: cryptedPassword,
      permission_create_admin,
    });

    return savedAdmin;
  }
}

export default CreateAdminService;
