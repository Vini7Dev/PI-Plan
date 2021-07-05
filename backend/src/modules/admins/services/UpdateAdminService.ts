import AdminsRepository from '../repositories/implementations/AdminsRepository';
import Admin from '../entities/Admin';

interface IRequest {
    id: string;
    name: string;
    username: string;
    current_password: string;
    new_password?: string;
}

class UpdateAdminService {
    // Repositório dos administradores
    private adminsRepository: AdminsRepository;

    constructor() {
      // Inicializando o repositório dos administradores
      this.adminsRepository = new AdminsRepository();
    }

    // Serviço para atualizar os dados de um administrador cadastrado
    public async execute({
      id,
      name,
      username,
      new_password,
      current_password,
    }: IRequest): Promise<Admin> {
      // Conta do Admin que deve ser atualizada
      const adminToUpdate = await this.adminsRepository.findById(id);

      // Verificando se o administrador existe
      if (!adminToUpdate) {
        throw new Error('Admin not found.');
      }

      // Confirmando se a senha informada é válida
      if (adminToUpdate.password !== current_password) {
        throw new Error('The password does not match.');
      }

      // Verificando se já existe um administrador cadastrado com esse username
      const adminWithSameUsername = await this.adminsRepository.findByUsername(
        username,
      );

      if (adminWithSameUsername && adminWithSameUsername.id !== id) {
        throw new Error('This username already exits.');
      }

      // Atualizando o administrador no banco de dados
      adminToUpdate.name = name;
      adminToUpdate.username = username;
      adminToUpdate.password = new_password || adminToUpdate.password;

      const savedAdmin = await this.adminsRepository.update(adminToUpdate);

      return savedAdmin;
    }
}

export default UpdateAdminService;
