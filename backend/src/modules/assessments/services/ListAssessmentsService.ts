import { inject, injectable } from 'tsyringe';

import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

interface IRequest {
  user_type: 'admin' | 'assembler';
  user_id: string;
}

@injectable()
class ListAssessmentsService {
  constructor(
    // Repositório das avaliações
    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,
  ) {}

  public async execute({
    user_type,
    user_id,
  }: IRequest): Promise<Assessment[]> {
    let assessmentsList: Assessment[];

    // Listando todas as avaliações
    if (user_type === 'admin') {
      assessmentsList = await this.assessmentsRepository.list();
    } else {
      assessmentsList = await this.assessmentsRepository.findByAssemblerId(user_id);
    }

    return assessmentsList;
  }
}

export default ListAssessmentsService;
