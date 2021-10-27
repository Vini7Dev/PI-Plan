import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IToDosRepository from '../repositories/IToDosRepository';

@injectable()
class DeleteToDosServices {
  constructor(
    // Repositório das tarefas
    @inject('ToDosRepository')
    private toDosRepository: IToDosRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    // Verificando se a tarefa existe antes de tentar apagar
    const todoToDelete = await this.toDosRepository.findById(id);

    if (!todoToDelete) {
      throw new AppError('ToDo not found.', 404);
    }

    // Apagando a tarefa
    const responseMessage = await this.toDosRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteToDosServices;
