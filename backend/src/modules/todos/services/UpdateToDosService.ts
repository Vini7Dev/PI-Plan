import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ToDo from '../typeorm/entities/ToDo';
import IToDosRepository from '../repositories/IToDosRepository';

interface IRequest{
  id: string;
  done: boolean;
  title: string;
  description: string;
}

@injectable()
class UpdateToDosService {
  constructor(
    // Repositório das tarefas
    @inject('ToDosRepository')
    private toDosRepository: IToDosRepository,
  ) {}

  public async execute({
    id,
    done,
    title,
    description,
  }: IRequest): Promise<ToDo> {
    // Verificando se a tarefa existe
    const toDoToUpdate = await this.toDosRepository.findById(id);

    if (!toDoToUpdate) {
      throw new AppError('ToDo not found.', 404);
    }

    // Atualizando os dados da tarefa
    toDoToUpdate.done = done;
    toDoToUpdate.title = title;
    toDoToUpdate.description = description;

    const updatedToDo = await this.toDosRepository.update(toDoToUpdate);

    return updatedToDo;
  }
}

export default UpdateToDosService;
