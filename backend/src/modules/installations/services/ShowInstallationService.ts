import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IInstallationsRepository from '../repositories/IInstallationsRepository';
import Installation from '../typeorm/entities/Installation';

interface IRequest {
  user_type: 'admin' | 'assembler';
  user_id: string;
  id: string;
}

@injectable()
class ShowInstallationService {
  constructor(
    // Repositório das instalações
    @inject('InstallationsRepository')
    private installationsRepository: IInstallationsRepository,
  ) {}

  // Serviço para busca da instalação pelo id
  public async execute({
    id,
    user_id,
    user_type,
  }: IRequest): Promise<Installation | undefined> {
    // Buscando pela instalação
    const findedInstallation = await this.installationsRepository.findById(id);

    // Verificando se o usuário é do tipo montador
    if (findedInstallation && user_type === 'assembler') {
      // Confirmando que o montador está envolvido com a instalação
      let isPresentInInstallation = false;

      findedInstallation.assemblers_installation.forEach((assembler) => {
        if (assembler.assembler_id === user_id) {
          isPresentInInstallation = true;
        }
      });

      if (!isPresentInInstallation) {
        throw new AppError('Does not have permission to get this installation data.', 403);
      }
    }

    return findedInstallation;
  }
}

export default ShowInstallationService;
