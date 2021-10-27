import ICreateInstallationDTO from '../dtos/ICreateInstallationDTO';
import Installation from '../typeorm/entities/Installation';

interface IInstallationsRepository {
  findById(id: string): Promise<Installation | undefined>;
  findByOrderId(order_id: string): Promise<Installation | undefined>;
  findByAssemblerId(assembler_id: string): Promise<Installation[]>;
  listInProgress(): Promise<Installation[]>;
  list(): Promise<Installation[]>;
  create(data: ICreateInstallationDTO): Promise<Installation>;
  update(data: ICreateInstallationDTO): Promise<Installation>;
  delete(id: string): Promise<string>;
  removeAssemblersByInstallationId(installation_id: string): Promise<void>;
}

export default IInstallationsRepository;
