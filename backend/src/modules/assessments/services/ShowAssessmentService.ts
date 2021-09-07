import { inject, injectable } from 'tsyringe';

import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

@injectable()
class ShowAssessmentService {
  constructor(
    // Repositório das avaliações
    @inject('AssesmentRepository')
    private assessmentRepository: IAssessmentsRepository,
  ) {}

  public async execute(id: string): Promise<Assessment|undefined> {
    // Buscando uma avaliação pelo id
    const assesmentShow = await this.assessmentRepository.findById(id);

    return assesmentShow;
  }
}

export default ShowAssessmentService;
