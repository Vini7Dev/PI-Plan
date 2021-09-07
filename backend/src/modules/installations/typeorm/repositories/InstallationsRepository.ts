import { getRepository, IsNull, Repository } from 'typeorm';
import ICreateInstallationDTO from '../../dtos/ICreateInstallationDTO';
import IInstallationsRepository from '../../repositories/IInstallationsRepository';
import AssemblerInstallation from '../entities/AssemblerInstallation';
import Installation from '../entities/Installation';

class InstallationsRepository implements IInstallationsRepository {
  private repository: Repository<Installation>;

  private assembsIntallRepository: Repository<AssemblerInstallation>;

  constructor() {
    this.repository = getRepository(Installation);
    this.assembsIntallRepository = getRepository(AssemblerInstallation);
  }

  // Buscando uma instalação pelo id
  public async findById(id: string): Promise<Installation | undefined> {
    const findedInstallation = await this.repository.findOne(id, {
      relations: [
        'order',
        'assessment',
        'assemblers_installation',
        'assemblers_installation.assembler',
      ],
    });

    return findedInstallation;
  }

  // Buscando uma instalação pelo id do pedido
  public async findByOrderId(order_id: string): Promise<Installation | undefined> {
    const findedInstallation = await this.repository.findOne({
      order_id,
    }, {
      relations: [
        'order',
        'assessment',
        'assemblers_installation',
        'assemblers_installation.assembler',
      ],
    });

    return findedInstallation;
  }

  // Listando as instalações em andamento
  public async listInProgress(): Promise<Installation[]> {
    const inProgressInstallations = await this.repository.find({
      where: { end_date: IsNull() }, relations: ['order'],
    });

    return inProgressInstallations;
  }

  // Listando as instalações de um montador
  public async findByAssemblerId(assembler_id: string): Promise<Installation[]> {
    const findedInstallations = await this.repository.createQueryBuilder('installation')
      .leftJoinAndSelect('installation.order', 'order')
      .leftJoinAndSelect('installation.assemblers_installation', 'assembler')
      .where('assembler.assembler_id = :assembler_id', { assembler_id })
      .getMany();

    return findedInstallations;
  }

  // Listando todas as instalações salvas
  public async list(): Promise<Installation[]> {
    const installationList = await this.repository.find({
      relations: [
        'order',
        'assessment',
        'assemblers_installation',
        'assemblers_installation.assembler',
      ],
    });

    return installationList;
  }

  // Cadastrando uma nova instalação
  public async create({
    order_id,
    start_date,
    end_date,
    completion_forecast,
    price,
    assemblers_installation,
  }: ICreateInstallationDTO): Promise<Installation> {
    const createdInstallation = this.repository.create({
      order_id,
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
    start_date,
    end_date,
    completion_forecast,
    price,
    assemblers_installation,
  }: ICreateInstallationDTO): Promise<Installation> {
    const updatedInstallation = await this.repository.save({
      id,
      order_id,
      start_date,
      end_date,
      completion_forecast,
      price,
      assemblers_installation,
    });

    return updatedInstallation;
  }

  // Apagando uma instalação
  public async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);

    return 'Instalação apagada.';
  }

  // Removendo os montadores pelo id da instalação
  public async removeAssemblersByInstallationId(installation_id: string): Promise<void> {
    await this.assembsIntallRepository.delete({
      installation_id,
    });
  }
}

export default InstallationsRepository;
