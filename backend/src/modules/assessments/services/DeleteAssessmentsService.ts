import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAssessmentsRepository from '../repositories/IAssessmentsRepository';

@injectable()
class DeleteAssessmentsServices {
  constructor(
    // Repositório das avaliações
    @inject('AssessmentsRepository')
    private assessmentsrepository: IAssessmentsRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    // Verificando se a avaliação existe antes de apagar
    const assessmentToDelete = await this.assessmentsrepository.findById(id);

    if (!assessmentToDelete) {
      throw new AppError('Assessment not found.', 404);
    }

    // Apagando a avaliação
    const responseMessage = await this.assessmentsrepository.delete(id);

    return responseMessage;
  }
}

export default DeleteAssessmentsServices;
