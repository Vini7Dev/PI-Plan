import { inject, injectable } from 'tsyringe';
import IInstallationsRepository from '../repositories/IInstallationsRepository';

import Installation from '../typeorm/entities/Installation';

interface IRequest {
  user_type: 'admin' | 'assembler';
  user_id: string;
  search_string?: string;
}

@injectable()
class ListInstallationsServices {
  constructor(
    // Repositório das instalações
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  public async execute({
    user_type,
    user_id,
    search_string = '',
  }: IRequest): Promise<Installation[]> {
    // Buscando as instalações salvas
    let installationsList: Installation[] = [];

    if (user_type === 'admin') {
      installationsList = await this.installationsRepository.list(search_string);
    } else {
      installationsList = await this.installationsRepository.findByAssemblerId(user_id);
    }

    return installationsList;
  }
}

export default ListInstallationsServices;
