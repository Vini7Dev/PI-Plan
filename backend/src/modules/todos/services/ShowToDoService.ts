import { inject, injectable } from 'tsyringe';
import ToDo from '../typeorm/entities/ToDo';
import IToDosRepository from '../repositories/IToDosRepository';

@injectable()
class ShowToDoService {
  constructor(
    // Repositório das tarefas
    @inject('ToDosRepository')
    private toDosRepository: IToDosRepository,
  ) {}

  public async execute(id: string): Promise<ToDo | undefined> {
    // Buscando pela tarefa com o seu id
    const findedToDo = await this.toDosRepository.findById(id);

    return findedToDo;
  }
}

export default ShowToDoService;
