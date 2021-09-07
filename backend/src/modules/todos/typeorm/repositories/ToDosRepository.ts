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
    const customer = await this.repository.findOne(id);

    return customer;
  }

  // Listando todas as tarefas
  public async list(): Promise<ToDo[]> {
    const customersList = await this.repository.find();

    return customersList;
  }

  // Cadastrando uma nova tarefa
  public async create({
    admin_id,
    done,
    title,
    description,
  }: ICreateToDoDTO): Promise<ToDo> {
    const createdCustomer = this.repository.create({
      admin_id,
      done,
      title,
      description,
    });

    await this.repository.save(createdCustomer);

    return createdCustomer;
  }

  // Atualizando os dados de uma tarefa
  public async update({
    id,
    done,
    title,
    description,
  }: ICreateToDoDTO): Promise<ToDo> {
    const updatedCustomer = await this.repository.save({
      id,
      done,
      title,
      description,
    });

    return updatedCustomer;
  }

  // Apagando uma tarefa
  public async delete(id: string): Promise<string> {
    await this.repository.delete(id);

    return 'Tarefa removida.';
  }
}

export default ToDosRepository;
