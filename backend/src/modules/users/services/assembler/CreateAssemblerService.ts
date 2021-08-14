import { inject, injectable } from 'tsyringe';

import Assembler from '../../entities/Assembler';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import AssemblersRepository from '../../repositories/implementations/AssemblersRepository';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import AdminsRepository from '../../repositories/implementations/AdminsRepository';
import IHashProvider from '../../../../shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  cellphone: string;
  username: string;
  password: string;
}

@injectable()
class CreateAssemblerService {
  constructor(
    // Repositório dos montadores e dos administradores
    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,

    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    // Inicializando o repositório dos montadores e dos administradores
    this.assemblersRepository = new AssemblersRepository();
    this.adminsRepository = new AdminsRepository();
  }

  // Serviço para a criação de um novo montador
  public async execute({
    name,
    cellphone,
    username,
    password,
  }: IRequest): Promise<Assembler> {
    // Verificando se já existe um usuário cadastrado com esse username
    const assemblerWithSameUsername = await this.assemblersRepository.findByUsername(
      username,
    );

    const adminWithSameUsername = await this.adminsRepository.findByUsername(
      username,
    );

    if (assemblerWithSameUsername || adminWithSameUsername) {
      throw new Error('This username already exits.');
    }

    // Criptografando a senha do usuário
    const cryptedPassword = await this.hashProvider.generate(password);

    // Salvando o montador no banco de dados
    const savedAssembler = await this.assemblersRepository.create({
      name,
      cellphone,
      username,
      password: cryptedPassword,
    });

    return savedAssembler;
  }
}

export default CreateAssemblerService;
