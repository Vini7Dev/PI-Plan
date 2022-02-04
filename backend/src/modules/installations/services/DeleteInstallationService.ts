import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IInstallationsRepository from '../repositories/IInstallationsRepository';
import IAssessmentsRepository from '../../assessments/repositories/IAssessmentsRepository';

@injectable()
class DeleteInstallationService {
  constructor(
    // Repositório das Instalações
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,
  ) { }

  public async execute(id: string): Promise<string> {
    // Verificando se a instalação existe
    const installationToDelete = await this.installationsRepository.findById(id);

    if (!installationToDelete) {
      throw new AppError('Installation not found.', 404);
    }

    // Verificando se a instalação tem alguma avaliação associada
    if (installationToDelete.assessment) {
      await this.assessmentsRepository.delete(installationToDelete.assessment.id);
    }

    // Executando o método para apagar uma instalação
    await this.installationsRepository.delete(id);

    return 'Instalação apagada.';
  }
}

export default DeleteInstallationService;
