import { inject, injectable } from 'tsyringe';
import IInstallationsRepository from '../repositories/IInstallationsRepository';

import Installation from '../typeorm/entities/Installation';

@injectable()
class ListInstallationsServices {
  constructor(
    // Repositório das instalações
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  public async execute(): Promise<Installation[]> {
    // Buscando as instalações salvas
    const installationsList = await this.installationsRepository.list();

    return installationsList;
  }
}

export default ListInstallationsServices;
