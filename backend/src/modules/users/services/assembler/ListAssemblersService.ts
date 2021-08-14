import { inject, injectable } from 'tsyringe';

import AssemblersRepository from '../../repositories/implementations/AssemblersRepository';
import Assembler from '../../entities/Assembler';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';

@injectable()
class ListAssemblersService {
  constructor(
    // Repositório dos montadores
    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,
  ) {
    // Inicializando o repositório dos montadores
    this.assemblersRepository = new AssemblersRepository();
  }

  // Serviço para listar os montadores cadastrados
  public async execute(): Promise<Assembler[]> {
    const assemblersList = await this.assemblersRepository.list();

    return assemblersList;
  }
}

export default ListAssemblersService;
