import AdminsRepository from '../repositories/implementations/AdminsRepository';
import Admin from '../entities/Admin';

class ListAdminsService {
    // Repositório dos administradores
    private adminsRepository: AdminsRepository;

    constructor() {
      // Inicializando o repositório dos administradores
      this.adminsRepository = new AdminsRepository();
    }

    // Serviço para listar os administradores cadastrados
    public async execute(): Promise<Admin[]> {
      const adminsList = await this.adminsRepository.list();

      return adminsList;
    }
}

export default ListAdminsService;
