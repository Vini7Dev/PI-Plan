import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

interface IRequest {
  user_type: 'admin' | 'assembler';
  user_id: string;
  id: string;
}

@injectable()
class ShowAssessmentService {
  constructor(
    // Repositório das avaliações
    @inject('AssessmentsRepository')
    private assessmentRepository: IAssessmentsRepository,
  ) {}

  public async execute({
    user_type,
    user_id,
    id,
  }: IRequest): Promise<Assessment|undefined> {
    // Buscando uma avaliação pelo id
    const findedAssessment = await this.assessmentRepository.findById(id);

    // Verificando se o usuário é do tipo montador
    if (findedAssessment && user_type === 'assembler') {
      // Confirmando que o montador está envolvido com a instalação
      let isPresentInInstallation = false;

      findedAssessment.installation.assemblers_installation.forEach((assembler) => {
        if (assembler.assembler_id === user_id) {
          isPresentInInstallation = true;
        }
      });

      if (!isPresentInInstallation) {
        throw new AppError('Does not have permission to get this assesment data.', 403);
      }
    }

    return findedAssessment;
  }
}

export default ShowAssessmentService;
