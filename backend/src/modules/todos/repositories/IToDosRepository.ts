import ICreateToDoDTO from '../dtos/ICreateToDo';
import ToDo from '../typeorm/entities/ToDo';

interface IToDosRepository {
  findById(id: string): Promise<ToDo | undefined>;
  findByAdminId(admin_id: string): Promise<ToDo[]>;
  list(): Promise<ToDo[]>;
  create(data: ICreateToDoDTO): Promise<ToDo>;
  update(data: ICreateToDoDTO): Promise<ToDo>;
  delete(id: string): Promise<string>;
}

export default IToDosRepository;
