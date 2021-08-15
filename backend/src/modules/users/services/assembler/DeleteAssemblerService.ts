import { inject, injectable } from 'tsyringe';

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
    const responseMessage = await this.assemblersRepository.delete(id);

    return responseMessage;
  }
}

export default DeleteAssemblerService;
