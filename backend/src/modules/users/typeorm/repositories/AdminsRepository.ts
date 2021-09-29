import { getRepository, Repository } from 'typeorm';

import IAdminsRepository from '../../repositories/IAdminsRepository';
import Admin from '../entities/Admin';
import ICreateAdminDTO from '../../dtos/ICreateAdminDTO';

class AdminsRepository implements IAdminsRepository {
    private repository: Repository<Admin>;

    constructor() {
      this.repository = getRepository(Admin);
    }

    // Buscando um administrador pelo id
    public async findById(id: string): Promise<Admin | undefined> {
      const admin = await this.repository.findOne(id);

      return admin;
    }

    // Aplicando a busca por um administrador a partir de uma string
    public async findBySearchParameter(search_string: string): Promise<Admin[]> {
      const adminsList = await this.repository.createQueryBuilder('admin')
        .where(`admin.name ILIKE '%${search_string}%'`)
        .orWhere(`admin.username ILIKE '%${search_string}%'`)
        .getMany();

      return adminsList;
    }

    // Buscando um administrador pelo seu username
    public async findByUsername(username: string): Promise<Admin | undefined> {
      const admin = await this.repository.findOne({ username });

      return admin;
    }

    // Listando os Administradores
    public async list(): Promise<Admin[]> {
      const adminsList = await this.repository.find();

      return adminsList;
    }

    // Salvando a conta administradora no banco de dados
    public async create({
      name,
      username,
      password,
      permission_create_admin,
    }: ICreateAdminDTO): Promise<Admin> {
      const createdAdmin = this.repository.create({
        name,
        username,
        password,
        permission_create_admin,
      });
      await this.repository.save(createdAdmin);

      return createdAdmin;
    }

    // Atualizando um Admin
    public async update({
      id,
      name,
      username,
      password,
    }: ICreateAdminDTO): Promise<Admin> {
      const updateAdmin = await this.repository.save({
        id,
        name,
        username,
        password,
      });

      return updateAdmin;
    }

    // Apagando Um Administrador
    public async delete(id: string): Promise<string> {
      await this.repository.softDelete(id);

      return 'Administrador removido';
    }
}

export default AdminsRepository;
