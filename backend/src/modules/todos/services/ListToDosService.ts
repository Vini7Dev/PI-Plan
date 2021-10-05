import { inject, injectable } from 'tsyringe';
import ToDo from '../typeorm/entities/ToDo';
import IToDosRepository from '../repositories/IToDosRepository';

@injectable()
class ListToDosService {
  constructor(
    // Repositório das tarefas
    @inject('ToDosRepository')
    private toDosRepository: IToDosRepository,
  ) {}

  public async execute(): Promise<ToDo[]> {
    // Listando todas as tarefas salvas
    const toDoList = await this.toDosRepository.list();

    return toDoList;
  }
}

export default ListToDosService;
