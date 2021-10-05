import { inject, injectable } from 'tsyringe';

import Assembler from '../../typeorm/entities/Assembler';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';

@injectable()
class ListAssemblersService {
  constructor(
    // Repositório dos montadores
    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,
  ) {}

  // Serviço para listar os montadores cadastrados
  public async execute(): Promise<Assembler[]> {
    const assemblersList = await this.assemblersRepository.list();

    return assemblersList;
  }
}

export default ListAssemblersService;
