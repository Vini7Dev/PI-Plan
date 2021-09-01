import { inject, injectable } from 'tsyringe';

import Admin from '../../typeorm/entities/Admin';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IClassTransformer from '../../../../shared/container/providers/ClassTransformerProvider/models/IClassTransformer';

@injectable()
class ListAdminsService {
  constructor(
    // Repositório dos administradores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('ClassTransformer')
    private classTransformer: IClassTransformer,
  ) {}

  // Serviço para listar os administradores cadastrados
  public async execute(): Promise<Admin[]> {
    const adminsList = await this.adminsRepository.list();

    const adminsClassTransformed = adminsList.map((admin) => {
      const adminWithoutPassword = this.classTransformer.deleteProps(admin, ['password']);

      return adminWithoutPassword;
    });

    return adminsClassTransformed;
  }
}

export default ListAdminsService;
