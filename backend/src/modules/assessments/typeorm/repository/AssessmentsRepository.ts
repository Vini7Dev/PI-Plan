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
    const findedAssessment = await this.repository.findOne(id, {
      relations: [
        'installation',
        'installation.order',
        'installation.assemblers_installation',
        'installation.assemblers_installation.assembler',
      ],
    });

    return findedAssessment;
  }

  // Listando todas as avaliações
  public async list(search_string: string): Promise<Assessment[]> {
    /*
    const assessmentList = await this.repository.find({
      relations: [
        'installation',
        'installation.order',
        'installation.assemblers_installation',
        'installation.assemblers_installation.assembler',
      ],
    });
    */

    const assessmentList = await this.repository.createQueryBuilder('assessment')
      .innerJoinAndSelect('assessment.installation', 'installation')
      .innerJoinAndSelect('installation.order', 'order')
      .innerJoinAndSelect('order.address', 'address')
      .innerJoinAndSelect('installation.assemblers_installation', 'assemblers_installation')
      .innerJoinAndSelect('assemblers_installation.assembler', 'assembler')
      .where(`order.title ILIKE '%${search_string}%'`)
      .orWhere(`order.description ILIKE '%${search_string}%'`)
      .orWhere(`order.installation_environments ILIKE '%${search_string}%'`)
      .orWhere(`address.cep ILIKE '%${search_string}%'`)
      .orWhere(`address.street ILIKE '%${search_string}%'`)
      .orWhere(`address.district ILIKE '%${search_string}%'`)
      .orWhere(`address.city ILIKE '%${search_string}%'`)
      .orWhere(`address.uf ILIKE '%${search_string}%'`)
      .orWhere(`assembler.name ILIKE '%${search_string}%'`)
      .orWhere(`assembler.username ILIKE '%${search_string}%'`)
      .orWhere(`assembler.cellphone ILIKE '%${search_string}%'`)
      .getMany();

    return assessmentList;
  }

  // Listando todas as avaliações de um montador
  public async findByAssemblerId(assembler_id: string): Promise<Assessment[]> {
    const assessmentList = await this.repository.createQueryBuilder('assessment')
      .leftJoinAndSelect('assessment.installation', 'installation')
      .leftJoinAndSelect('installation.order', 'order')
      .leftJoinAndSelect('installation.assemblers_installation', 'assembler')
      .leftJoinAndSelect('assembler.assembler', 'assembler_data')
      .where('assembler.assembler_id = :assembler_id', { assembler_id })
      .getMany();

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
