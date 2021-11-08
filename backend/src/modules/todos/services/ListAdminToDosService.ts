import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import IAdminsRepository from '../../users/repositories/IAdminsRepository';
import IToDosRepository from '../repositories/IToDosRepository';
import ToDo from '../typeorm/entities/ToDo';

@injectable()
class ListAdminToDosService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('ToDosRepository')
    private toDosRepository: IToDosRepository,
  ) {}

  public async execute(admin_id: string): Promise<ToDo[]> {
    // Verificando se o administrador existe
    const adminExists = await this.adminsRepository.findById(admin_id);

    if (!adminExists) {
      throw new AppError('Admin not found.', 404);
    }

    // Listando as tarefas do administrador
    const toDosList = await this.toDosRepository.findByAdminId(admin_id);

    return toDosList;
  }
}

export default ListAdminToDosService;
