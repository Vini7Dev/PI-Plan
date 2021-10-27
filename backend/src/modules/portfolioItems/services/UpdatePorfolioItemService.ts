import { inject, injectable } from 'tsyringe';

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '../../../shared/errors/AppError';
import IPortfolioItemRepository from '../repositories/IPortfolioItemRepository';
import PortfolioItem from '../typeorm/entities/PortfolioItem';

interface IRequest {
  id: string;
  title: string;
  description: string;
  image_name?: string;
}

@injectable()
class UpdatePorfolioItemService {
  constructor(
    // Repositório dos itens do portfólio
    @inject('PortfolioItemRepository')
    private portfolioItemRepository: IPortfolioItemRepository,

    // Provider para armazenamento de arquivos
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    title,
    description,
    image_name,
  }: IRequest): Promise<PortfolioItem> {
    // Verificando se o item existe
    const portfolioItemToUpdate = await this.portfolioItemRepository.findById(id);

    if (!portfolioItemToUpdate) {
      throw new AppError('Portfolio item not found.', 404);
    }

    // Updating item image in storage
    if (image_name) {
      await this.storageProvider.deleteFile(portfolioItemToUpdate.image_reference);

      await this.storageProvider.saveFile(image_name);

      portfolioItemToUpdate.image_reference = image_name;
    }

    // Updating item data
    portfolioItemToUpdate.title = title;
    portfolioItemToUpdate.description = description;

    const updatedPortfolioItem = await this.portfolioItemRepository.update(portfolioItemToUpdate);

    return updatedPortfolioItem;
  }
}

export default UpdatePorfolioItemService;
