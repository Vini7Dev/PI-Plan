import ICreateAdminDTOS from '../dtos/ICreateAdminDTOS';
import Admin from '../infra/typeorm/entities/Admin';

interface IAdminsRepository {
    findByUsername(username: string): Promise<Admin | undefined>;
    create(data: ICreateAdminDTOS): Promise<Admin>;
    delete(id: string): Promise<void>;
    list(): Promise<Admin[]>;
    update(data: ICreateAdminDTOS): Promise<void>;
}

export default IAdminsRepository;
