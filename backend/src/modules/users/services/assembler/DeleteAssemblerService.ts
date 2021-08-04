import IAssemblersRepository from '../../repositories/IAssemblersRepository';
import AssemblersRepository from '../../repositories/implementations/AssemblersRepository';

class DeleteAssemblerService {
    // Repositório dos montadores
    private assemblersRepository: IAssemblersRepository;

    constructor() {
      // Inicializando o repositório dos montadores
      this.assemblersRepository = new AssemblersRepository();
    }

    // Serviço para remover um montador pelo seu ID
    public async execute(id: string): Promise<void> {
      await this.assemblersRepository.delete(id);
    }
}

export default DeleteAssemblerService;
