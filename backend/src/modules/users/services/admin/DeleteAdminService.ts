import AdminsRepository from '../../infra/typeorm/repositories/AdminsRepository';

class DeleteAdminService {
    // Repositório dos administradores
    private adminsRepository: AdminsRepository;

    constructor() {
        // Inicializando o repositório dos administradores
        this.adminsRepository = new AdminsRepository();
    }

    // Serviço para remover um administrador pelo seu ID
    public async execute(id: string): Promise<void> {
        await this.adminsRepository.delete(id);
    }
}

export default DeleteAdminService;
