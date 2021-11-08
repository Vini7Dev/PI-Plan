import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IAssessmentsRepository from '../repositories/IAssessmentsRepository';
import Assessment from '../typeorm/entities/Assessment';

interface IRequest{
  id: string;
  cleaning_note: number;
  finish_note: number;
  customer_note: number;
  manager_note: number;
  loss_amount: number;
  comment: string;
}

@injectable()
class UpdateAssessmentsService {
  constructor(
    // Repositório das avaliações
    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,
  ) {}

  public async execute({
    id,
    cleaning_note,
    finish_note,
    customer_note,
    manager_note,
    loss_amount,
    comment,
  }: IRequest): Promise<Assessment> {
    // Verificando se a avaliação existe
    const assessmentsToUpdate = await this.assessmentsRepository.findById(id);

    if (!assessmentsToUpdate) {
      throw new AppError('Assessment not found.', 404);
    }

    // Atualizando os dados da avaliação
    assessmentsToUpdate.cleaning_note = cleaning_note;
    assessmentsToUpdate.finish_note = finish_note;
    assessmentsToUpdate.customer_note = customer_note;
    assessmentsToUpdate.manager_note = manager_note;
    assessmentsToUpdate.loss_amount = loss_amount;
    assessmentsToUpdate.comment = comment;

    const updatedAssessment = await this.assessmentsRepository.update(assessmentsToUpdate);

    return updatedAssessment;
  }
}

export default UpdateAssessmentsService;
