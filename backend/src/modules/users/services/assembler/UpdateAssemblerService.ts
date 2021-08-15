import { inject, injectable } from 'tsyringe';

import Assembler from '../../entities/Assembler';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import IHashProvider from '../../../../shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '../../../../shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    username: string;
    cellphone: string;
    current_password: string;
    new_password?: string;
}

@injectable()
class UpdateAssemblerService {
  constructor(
    // Repositório dos montadores e dos administradores
    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,

    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  // Serviço para atualizar os dados de um montador cadastrado
  public async execute({
    id,
    name,
    username,
    cellphone,
    current_password,
    new_password,
  }: IRequest): Promise<Assembler> {
    // Conta do montador que deve ser atualizada
    const assemblerToUpdate = await this.assemblersRepository.findById(id);

    // Verificando se o montador existe
    if (!assemblerToUpdate) {
      throw new AppError('Assembler not found.', 404);
    }

    // Confirmando se a senha informada é válida
    const passwordMatch = await this.hashProvider.compare(
      current_password, assemblerToUpdate.password,
    );

    if (!passwordMatch) {
      throw new AppError('The password does not match.', 401);
    }

    // Verificando se já existe um outro usuário cadastrado com esse username
    const assemblerWithSameUsername = await this.assemblersRepository.findByUsername(
      username,
    );

    if (assemblerWithSameUsername && assemblerWithSameUsername.id !== id) {
      throw new AppError('This username already exits.');
    }

    const adminWithSameUsername = await this.adminsRepository.findByUsername(
      username,
    );

    if (adminWithSameUsername) {
      throw new AppError('This username already exits.');
    }

    // Atualizando os dados do montador no banco de dados
    assemblerToUpdate.name = name;
    assemblerToUpdate.username = username;
    assemblerToUpdate.cellphone = cellphone;
    if (new_password) {
      assemblerToUpdate.password = await this.hashProvider.generate(new_password);
    }

    const savedAssembler = await this.assemblersRepository.update(assemblerToUpdate);

    return savedAssembler;
  }
}

export default UpdateAssemblerService;
