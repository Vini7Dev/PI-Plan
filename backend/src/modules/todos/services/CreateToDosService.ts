import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ToDo from '../typeorm/entities/ToDo';
import IToDosRepository from '../repositories/IToDosRepository';
import IAdminsRepository from '../../users/repositories/IAdminsRepository';

interface IRequest{
  admin_id: string;
  done: boolean;
  title: string;
  description: string;
}

@injectable()
class CreateToDosService {
  constructor(
    // Repositório das tarefas e dos administradores
    @inject('ToDosRepository')
    private toDosRepository: IToDosRepository,

    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) {}

  public async execute({
    admin_id,
    done,
    title,
    description,
  }: IRequest): Promise<ToDo> {
    // Verificando se o administrador informado existe
    const adminExists = await this.adminsRepository.findById(admin_id);

    if (!adminExists) {
      throw new AppError('Admin not found.', 404);
    }

    // Cadastrando a tarefa
    const toDoCreated = await this.toDosRepository.create({
      admin_id,
      done,
      title,
      description,
    });

    return toDoCreated;
  }
}

export default CreateToDosService;
