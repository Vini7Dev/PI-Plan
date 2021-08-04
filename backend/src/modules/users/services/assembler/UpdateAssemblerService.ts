import AdminsRepository from '../../repositories/implementations/AdminsRepository';
import Assembler from '../../entities/Assembler';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import AssemblersRepository from '../../repositories/implementations/AssemblersRepository';

interface IRequest {
    id: string;
    name: string;
    username: string;
    cellphone: string;
    current_password: string;
    new_password?: string;
}

class UpdateAssemblerService {
  // Repositório dos montadores e dos administradores
  private assemblersRepository: IAssemblersRepository;

  private adminsRepository: IAdminsRepository;

  constructor() {
    // Inicializando o repositório dos montadores e dos administradores
    this.assemblersRepository = new AssemblersRepository();
    this.adminsRepository = new AdminsRepository();
  }

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
      throw new Error('Assembler not found.');
    }

    // Confirmando se a senha informada é válida
    if (assemblerToUpdate.password !== current_password) {
      throw new Error('The password does not match.');
    }

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

    // Atualizando os dados do montador no banco de dados
    assemblerToUpdate.name = name;
    assemblerToUpdate.username = username;
    assemblerToUpdate.cellphone = cellphone;
    assemblerToUpdate.password = new_password || assemblerToUpdate.password;

    const savedAssembler = await this.assemblersRepository.update(assemblerToUpdate);

    return savedAssembler;
  }
}

export default UpdateAssemblerService;
