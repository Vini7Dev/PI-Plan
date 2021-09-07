import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IInstallationsRepository from '../../installations/repositories/IInstallationsRepository';
import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

interface IRequest{
  installation_id: string;
  cleaning_note: number;
  finish_note: number;
  customer_note: number;
  manager_note: number;
  loss_amount: number;
  comment: string;
}

@injectable()
class CreateAssessmentsServices {
  constructor(
    // Repositório de avaliações e instalações
    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,

    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  public async execute({
    installation_id,
    cleaning_note,
    finish_note,
    customer_note,
    manager_note,
    loss_amount,
    comment,
  }: IRequest): Promise<Assessment> {
    // Verificando se a instalação existe
    const installationExists = await this.installationsRepository.findById(installation_id);

    if (!installationExists) {
      throw new AppError('Installation not found.', 404);
    }

    // Cadastrando a avaliação
    const assessment = await this.assessmentsRepository.create({
      installation_id,
      cleaning_note,
      finish_note,
      customer_note,
      manager_note,
      loss_amount,
      comment,
    });

    return assessment;
  }
}

export default CreateAssessmentsServices;
