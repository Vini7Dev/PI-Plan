import { inject, injectable } from 'tsyringe';

import AdminsRepository from '../../repositories/implementations/AdminsRepository';
import Admin from '../../entities/Admin';
import IAdminsRepository from '../../repositories/IAdminsRepository';

@injectable()
class ListAdminsService {
  constructor(
    // Repositório dos administradores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) {
    // Inicializando o repositório dos administradores
    this.adminsRepository = new AdminsRepository();
  }

  // Serviço para listar os administradores cadastrados
  public async execute(): Promise<Admin[]> {
    const adminsList = await this.adminsRepository.list();

    return adminsList;
  }
}

export default ListAdminsService;
