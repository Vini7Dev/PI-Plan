import AssemblersRepository from '../repositories/implementations/AssemblersRepository';
import Assembler from '../entities/Assembler';
import IAssemblersRepository from '../repositories/IAssemblersRepository';

class ListAssemblersService {
    // Repositório dos montadores
    private assemblersRepository: IAssemblersRepository;

    constructor() {
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
