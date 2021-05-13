import { getRepository, Repository } from 'typeorm';
import IAdminsRepository from '../../../repositories/IAdminsRepository';
import Admin from '../entities/Admin';
import ICreateAdminDTOS from '../../../dtos/ICreateAdminDTOS';

class AdminsRepository implements IAdminsRepository {
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

    // Apagando Um Administrador
    public async delete(id: string): Promise<void>{
        await this.repository.delete(id);
    }

    public async list(): Promise<Admin[]>{
        await this.repository.find();
    }

    // Atualizando 
    public async update({
        id,
        name, 
        username, 
        password,
        permission_create_admin,
    }: ICreateAdminDTOS): Promise<Admin> {
        const updatedAdmin = this.repository.update({
            id,
            name, 
            username, 
            password, 
            permission_create_admin,
        })
        await this.repository.save(updatedAdmin);

    }
}

export default AdminsRepository;
