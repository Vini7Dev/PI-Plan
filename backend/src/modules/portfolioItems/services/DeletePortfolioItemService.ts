import { inject, injectable } from 'tsyringe';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '../../../shared/errors/AppError';

import IPortfolioItemRepository from '../repositories/IPortfolioItemRepository';

@injectable()
class DeletePortfolioItemService {
  constructor(
    // Repositório dos itens do protfólio
    @inject('PortfolioItemRepository')
    private portfolioItemsRepository: IPortfolioItemRepository,

    // Provider para armazenamento de arquivos
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<string> {
    // Verificando se o item existe antes de apaga-lo
    const portfolioItemToDelete = await this.portfolioItemsRepository.findById(id);

    if (!portfolioItemToDelete) {
      throw new AppError('Portfolio item not found.', 404);
    }

    // Apagando a imagem salva do item
    const itemImageReference = portfolioItemToDelete.image_reference;

    await this.storageProvider.deleteFile(itemImageReference);

    // Apagando o item do portfólio
    await this.portfolioItemsRepository.delete(id);

    return 'Item apagado.';
  }
}

export default DeletePortfolioItemService;
