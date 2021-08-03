import IAdminsRepository from '../repositories/IAdminsRepository';
import AdminsRepository from '../repositories/implementations/AdminsRepository';
import Admin from '../entities/Admin';
import IAssemblersRepository from '../../assemblers/repositories/IAssemblersRepository';
import AssemblersRepository from '../../assemblers/repositories/implementations/AssemblersRepository';

interface IRequest {
    name: string;
    username: string;
    password: string;
    permission_create_admin: boolean;
}

class CreateAdminService {
    // Repositório dos administradores e dos montadores
    private adminsRepository: IAdminsRepository;

    private assemblersRepository: IAssemblersRepository;

    constructor() {
      // Inicializando o repositório dos administradores e dos montadores
      this.adminsRepository = new AdminsRepository();
      this.assemblersRepository = new AssemblersRepository();
    }

    // Serviço para a criação de um novo usuário administrador
    public async execute({
      name,
      username,
      password,
      permission_create_admin,
    }: IRequest): Promise<Admin> {
      // Verificando se já existe um montador cadastrado com esse username
      const adminWithSameUsername = await this.adminsRepository.findByUsername(
        username,
      );

      const assemblerWithSameUsername = await this.assemblersRepository.findByUsername(
        username,
      );

      if (adminWithSameUsername || assemblerWithSameUsername) {
        throw new Error('This username already exits.');
      }

      // Salvando o montador no banco de dados
      const savedAdmin = await this.adminsRepository.create({
        name,
        username,
        password,
        permission_create_admin,
      });

      return savedAdmin;
    }
}

export default CreateAdminService;
