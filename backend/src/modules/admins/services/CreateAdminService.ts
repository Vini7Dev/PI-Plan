import IAdminsRepository from '../repositories/IAdminsRepository';
import AdminsRepository from '../repositories/implementations/AdminsRepository';
import Admin from '../entities/Admin';

interface IRequest {
    name: string;
    username: string;
    password: string;
    permission_create_admin: boolean;
}

class CreateAdminService {
    // Repositório dos administradores
    private adminsRepository: IAdminsRepository;

    constructor() {
      // Inicializando o repositório dos administradores
      this.adminsRepository = new AdminsRepository();
    }

    // Serviço para a criação de um novo usuário administrador
    public async execute({
      name,
      username,
      password,
      permission_create_admin,
    }: IRequest): Promise<Admin> {
      // Verificando se já existe um administrador cadastrado com esse username
      const adminWithSameUsername = await this.adminsRepository.findByUsername(
        username,
      );

      if (adminWithSameUsername) {
        throw new Error('This username already exits.');
      }

      // Salvando o administrador no banco de dados
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
