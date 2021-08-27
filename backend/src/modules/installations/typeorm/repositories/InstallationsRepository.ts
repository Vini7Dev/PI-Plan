import { getRepository, Repository } from 'typeorm';
import ICreateInstallationDTO from '../../dtos/ICreateInstallationDTO';
import IInstallationsRepository from '../../repositories/IInstallationsRepository';
import Installation from '../entities/Installation';

class InstallationsRepository implements IInstallationsRepository {
  private repository: Repository<Installation>;

  constructor() {
    this.repository = getRepository(Installation);
  }

  // Buscando uma instalação pelo id
  public async findById(id: string): Promise<Installation | undefined> {
    const findedInstallation = await this.repository.findOne(id);

    return findedInstallation;
  }

  // Listando todas as instalações salvas
  public async list(): Promise<Installation[]> {
    const installationList = await this.repository.find();

    return installationList;
  }

  // Cadastrando uma nova instalação
  public async create({
    order_id,
    done,
    start_date,
    end_date,
    completion_forecast,
    price,
    assemblers_installation,
  }: ICreateInstallationDTO): Promise<Installation> {
    const createdInstallation = this.repository.create({
      order_id,
      done,
      start_date,
      end_date,
      completion_forecast,
      price,
      assemblers_installation,
    });

    await this.repository.save(createdInstallation);

    return createdInstallation;
  }

  // Atualizando os dados de uma instalação
  public async update({
    id,
    order_id,
    done,
    start_date,
    end_date,
    completion_forecast,
    price,
  }: ICreateInstallationDTO): Promise<Installation> {
    const updatedInstallation = await this.repository.save({
      id,
      order_id,
      done,
      start_date,
      end_date,
      completion_forecast,
      price,
    });

    return updatedInstallation;
  }

  // Apagando uma instalação
  public async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);

    return 'Instalação apagada.';
  }
}

export default InstallationsRepository;
