import { inject, injectable } from 'tsyringe';

import Admin from '../../entities/Admin';
import IAdminsRepository from '../../repositories/IAdminsRepository';

@injectable()
class ListAdminsService {
  constructor(
    // Repositório dos administradores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) {}

  // Serviço para listar os administradores cadastrados
  public async execute(): Promise<Admin[]> {
    const adminsList = await this.adminsRepository.list();

    return adminsList;
  }
}

export default ListAdminsService;
