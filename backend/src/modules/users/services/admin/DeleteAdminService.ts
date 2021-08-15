import { inject, injectable } from 'tsyringe';

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
    const responseMessage = await this.adminsRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteAdminService;
