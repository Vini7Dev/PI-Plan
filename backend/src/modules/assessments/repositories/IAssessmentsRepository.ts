import IAssessmentDTO from '../dtos/IAssessmentDTO';
import Assessment from '../typeorm/entities/Assessment';

interface IAssessmentsRepository{
  findById(id: string): Promise<Assessment | undefined>;
  findByAssemblerId(assembler_id: string): Promise<Assessment[]>;
  list(search_string: string): Promise<Assessment[]>;
  create(data: IAssessmentDTO): Promise<Assessment>;
  update(data: IAssessmentDTO): Promise<Assessment>;
  delete(id: string): Promise<string>;
}

export default IAssessmentsRepository;
