import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IAdminsRepository from '../../repositories/IAdminsRepository';

@injectable()
class DeleteAdminService {
  constructor(
    // Repositório dos administradores
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) {}

  // Serviço para remover um administrador pelo seu ID
  public async execute(id: string): Promise<string> {
    // Verificar se o administrador existe antes de apagar
    const adminToDelete = await this.adminsRepository.findById(id);

    if (!adminToDelete) {
      throw new AppError('Admin not found.', 404);
    }

    // Apagando o administrador
    const responseMessage = await this.adminsRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteAdminService;
