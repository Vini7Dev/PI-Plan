import AdminsRepository from '../../infra/typeorm/repositories/AdminsRepository';
import Admin from '../../infra/typeorm/entities/Admin';

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
