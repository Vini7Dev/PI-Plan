import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IInstallationsRepository from '../repositories/IInstallationsRepository';

@injectable()
class DeleteInstallationService {
  constructor(
    // Repositório das Instalações
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    // Verificando se a instalação existe
    const installationToDelete = await this.installationsRepository.findById(id);

    if (!installationToDelete) {
      throw new AppError('Installation not found.', 404);
    }

    // Executando o serviço para apagar uma instalação
    await this.installationsRepository.delete(id);

    return 'Instalação apagada.';
  }
}

export default DeleteInstallationService;
