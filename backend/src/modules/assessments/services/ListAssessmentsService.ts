import { inject, injectable } from 'tsyringe';

import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

@injectable()
class ListAssessmentsService {
  constructor(
    // Repositório das avaliações
    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,
  ) {}

  public async execute(): Promise<Assessment[]> {
    // Listando todas as avaliações
    const assessmentsList = await this.assessmentsRepository.list();

    return assessmentsList;
  }
}

export default ListAssessmentsService;
