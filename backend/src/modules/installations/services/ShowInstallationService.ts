import { inject, injectable } from 'tsyringe';
import IInstallationsRepository from '../repositories/IInstallationsRepository';
import Installation from '../typeorm/entities/Installation';

@injectable()
class ShowInstallationService {
  constructor(
    // Repositório das instalações
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  // Serviço para busca da instalação pelo id
  public async execute(id: string): Promise<Installation | undefined> {
    const findedInstallation = await this.installationsRepository.findById(id);

    return findedInstallation;
  }
}

export default ShowInstallationService;
