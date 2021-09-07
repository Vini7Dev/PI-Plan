import { getRepository, Repository } from 'typeorm';

import IAssessmentDTO from '../../dtos/IAssessmentDTO';
import IAssessmentsRepository from '../../repositories/IAssessmentsRepository';
import Assessment from '../entities/Assessment';

class AssessmentsRepository implements IAssessmentsRepository {
  private repository: Repository<Assessment>;

  constructor() {
    this.repository = getRepository(Assessment);
  }

  // Buscando uma avaliação pelo id
  public async findById(id: string): Promise<Assessment | undefined> {
    const findedAssessment = await this.repository.findOne(id);

    return findedAssessment;
  }

  // Listando todas as avaliações
  public async list(): Promise<Assessment[]> {
    const assessmentList = await this.repository.find();

    return assessmentList;
  }

  // Cadastrando uma nova avaliação
  public async create({
    installation_id,
    cleaning_note,
    finish_note,
    customer_note,
    manager_note,
    loss_amount,
    comment,
  }: IAssessmentDTO): Promise<Assessment> {
    const createdCustomer = this.repository.create({
      installation_id,
      cleaning_note,
      finish_note,
      manager_note,
      loss_amount,
      comment,
      customer_note,
    });

    await this.repository.save(createdCustomer);

    return createdCustomer;
  }

  // Atualizando os dados de uma avaliação
  public async update({
    id,
    cleaning_note,
    finish_note,
    customer_note,
    manager_note,
    loss_amount,
    comment,
  }: IAssessmentDTO): Promise<Assessment> {
    const updatedAssessment = await this.repository.save({
      id,
      cleaning_note,
      finish_note,
      customer_note,
      manager_note,
      loss_amount,
      comment,
    });

    return updatedAssessment;
  }

  // Apagando uma avaliação
  public async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);

    return 'Avaliação removida.';
  }
}

export default AssessmentsRepository;
