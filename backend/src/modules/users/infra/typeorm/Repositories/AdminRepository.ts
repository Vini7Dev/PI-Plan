import { getRepository, Repository } from "typeorm";
import IAdminRepository from "../../../Repositories/IAdminRepository";
import Admin from "../entities/Admin";
import ICreateAdminDTOS from '../../../dtos/ICreateAdminDTOS'

class AdminRepository implements IAdminRepository{
    private repository: Repository<Admin>;

    constructor(){
        this.repository = getRepository(Admin);
    }

    //CREATE USER ADMIN
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
            await this.repository.save(createdAdmin)
    
            return createdAdmin;
        };

}

export default AdminRepository;