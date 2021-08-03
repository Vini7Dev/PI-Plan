import IAdminsRepository from '../../admins/repositories/IAdminsRepository';
import AdminsRepository from '../../admins/repositories/implementations/AdminsRepository';
import Assembler from '../entities/Assembler';
import IAssemblersRepository from '../repositories/IAssemblersRepository';
import AssemblersRepository from '../repositories/implementations/AssemblersRepository';

interface IRequest {
  name: string;
  cellphone: string;
  username: string;
  password: string;
}

class CreateAssemblerService {
  // Repositório dos montadores e dos administradores
  private assemblersRepository: IAssemblersRepository;

  private adminsRepository: IAdminsRepository;

  constructor() {
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

    // Salvando o montador no banco de dados
    const savedAssembler = await this.assemblersRepository.create({
      name,
      cellphone,
      username,
      password,
    });

    return savedAssembler;
  }
}

export default CreateAssemblerService;
