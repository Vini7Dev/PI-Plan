import ICreateAdminDTO from '../dtos/ICreateAdminDTO';
import Admin from '../typeorm/entities/Admin';

interface IAdminsRepository {
  findById(id: string): Promise<Admin | undefined>;
  findByUsername(username: string): Promise<Admin | undefined>;
  create(data: ICreateAdminDTO): Promise<Admin>;
  delete(id: string): Promise<string>;
  list(): Promise<Admin[]>;
  update(data: ICreateAdminDTO): Promise<Admin>;
}

export default IAdminsRepository;
