import { inject, injectable } from 'tsyringe';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import Assembler from '../../typeorm/entities/Assembler';

@injectable()
class ShowAssemblerService {
  constructor(
    // Repositório dos montadores
    @inject('AssemblersRepository')
    private assemblerRepository: IAssemblersRepository,
  ) {}

  // Serviço para busca do montador pelo id
  public async execute(id: string): Promise<Assembler | undefined> {
    const findedAssembler = await this.assemblerRepository.findById(id);

    return findedAssembler;
  }
}

export default ShowAssemblerService;
