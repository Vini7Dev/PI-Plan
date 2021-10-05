import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';

@injectable()
class DeleteAssemblerService {
  constructor(
    // Repositório dos montadores
    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,
  ) {}

  // Serviço para remover um montador pelo seu ID
  public async execute(id: string): Promise<string> {
    // Verificando se o montador existe antes de apagar
    const assemblerToDelete = await this.assemblersRepository.findById(id);

    if (!assemblerToDelete) {
      throw new AppError('Assembler not found.', 404);
    }

    // Apagando o montador
    const responseMessage = await this.assemblersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteAssemblerService;
