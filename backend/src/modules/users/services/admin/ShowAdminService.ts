import { inject, injectable } from 'tsyringe';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import Admin from '../../typeorm/entities/Admin';

@injectable()
class ShowAdminService {
  constructor(
    // Repositório dos administradores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) {}

  // Serviço para busca do administrador pelo id
  public async execute(id: string): Promise<Admin | undefined> {
    const findedAdmin = await this.adminsRepository.findById(id);

    return findedAdmin;
  }
}

export default ShowAdminService;
