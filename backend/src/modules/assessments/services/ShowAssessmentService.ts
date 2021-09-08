import { inject, injectable } from 'tsyringe';

import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

@injectable()
class ShowAssessmentService {
  constructor(
    // Repositório das avaliações
    @inject('AssessmentsRepository')
    private assessmentRepository: IAssessmentsRepository,
  ) {}

  public async execute(id: string): Promise<Assessment|undefined> {
    // Buscando uma avaliação pelo id
    const findedAssessment = await this.assessmentRepository.findById(id);

    return findedAssessment;
  }
}

export default ShowAssessmentService;
