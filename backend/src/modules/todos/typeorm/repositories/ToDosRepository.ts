import { getRepository, Repository } from 'typeorm';
import ICreateToDoDTO from '../../dtos/ICreateToDo';
import IToDosRepository from '../../repositories/IToDosRepository';
import ToDo from '../entities/ToDo';

class ToDosRepository implements IToDosRepository {
  private repository: Repository<ToDo>;

  constructor() {
    this.repository = getRepository(ToDo);
  }

  // Buscando uma tarefa pelo id
  public async findById(id: string): Promise<ToDo | undefined> {
    const toDoList = await this.repository.findOne(id);

    return toDoList;
  }

  // Buscando as tarefas pelo id do administrador
  public async findByAdminId(admin_id: string): Promise<ToDo[]> {
    const toDoList = await this.repository.find({
      admin_id,
    });

    return toDoList;
  }

  // Listando todas as tarefas
  public async list(): Promise<ToDo[]> {
    const toDosList = await this.repository.find();

    return toDosList;
  }

  // Cadastrando uma nova tarefa
  public async create({
    admin_id,
    done,
    title,
    description,
  }: ICreateToDoDTO): Promise<ToDo> {
    const createdToDo = this.repository.create({
      admin_id,
      done,
      title,
      description,
    });

    await this.repository.save(createdToDo);

    return createdToDo;
  }

  // Atualizando os dados de uma tarefa
  public async update({
    id,
    done,
    title,
    description,
  }: ICreateToDoDTO): Promise<ToDo> {
    const updatedToDo = await this.repository.save({
      id,
      done,
      title,
      description,
    });

    return updatedToDo;
  }

  // Apagando uma tarefa
  public async delete(id: string): Promise<string> {
    await this.repository.delete(id);

    return 'Tarefa removida.';
  }
}

export default ToDosRepository;
