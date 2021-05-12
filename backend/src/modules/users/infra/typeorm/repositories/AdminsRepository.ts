import { getRepository, Repository } from 'typeorm';
import IAdminRepository from '../../../repositories/IAdminsRepository';
import Admin from '../entities/Admin';
import ICreateAdminDTOS from '../../../dtos/ICreateAdminDTOS';

class AdminRepository implements IAdminRepository {
    private repository: Repository<Admin>;

    constructor() {
        this.repository = getRepository(Admin);
    }

    // Buscando um administrador pelo seu username
    public async findByUsername(username: string): Promise<Admin | undefined> {
        const admin = await this.repository.findOne({ username });

        return admin;
    }

    // Salvando a conta administradora no banco de dados
    public async create({
        name,
        username,
        password,
        permission_create_admin,
    }: ICreateAdminDTOS): Promise<Admin> {
        const createdAdmin = this.repository.create({
            name,
            username,
            password,
            permission_create_admin,
        });
        await this.repository.save(createdAdmin);

        return createdAdmin;
    }
}

export default AdminRepository;
