import ICreateAdminDTOS from '../dtos/ICreateAdminDTOS';
import Admin from '../entities/Admin';

interface IAdminsRepository {
    findById(id: string): Promise<Admin | undefined>;
    findByUsername(username: string): Promise<Admin | undefined>;
    create(data: ICreateAdminDTOS): Promise<Admin>;
    delete(id: string): Promise<string>;
    list(): Promise<Admin[]>;
    update(data: ICreateAdminDTOS): Promise<Admin>;
}

export default IAdminsRepository;
