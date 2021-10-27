import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../configs/authConfig';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import IHashProvider from '../../../../shared/container/providers/HashProvider/models/IHashProvider';
import User from '../../typeorm/entities/User';
import AppError from '../../../../shared/errors/AppError';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

@injectable()
class CreateSectionService {
  constructor(
    // Repositório dos administradores e dos montadores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    password,
  }: IRequest): Promise<IResponse> {
    // Buscando o usuário pelo username
    // Caso não encontre o usuário na tabela de administradores vai buscar na tabela de montadores
    const user = (
      await this.adminsRepository.findByUsername(username)
      || await this.assemblersRepository.findByUsername(username)
    );

    if (!user) {
      throw new AppError('Invalid credentials.', 401);
    }

    // Verificando se a senha está correta
    const passwordMatch = await this.hashProvider.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid credentials.', 401);
    }

    // Gerando o token de autenticação
    const { secret, expiresIn } = authConfig.token;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export default CreateSectionService;
