import ICreateAdminDTOS from "../dtos/ICreateAdminDTOS";
import Admin from "../infra/typeorm/entities/Admin";

interface IAdminRepository {
    create(data: ICreateAdminDTOS): Promise<Admin>;
}

export default IAdminRepository;