import { inject, injectable } from 'tsyringe';

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import IPortfolioItemRepository from '../repositories/IPortfolioItemRepository';
import PortfolioItem from '../typeorm/entities/PortfolioItem';

interface IRequest {
  title: string;
  description: string;
  image_name: string;
}

@injectable()
class CreatePortfolioItemService {
  constructor(
    // Repositório dos itens do portfólio
    @inject('PortfolioItemRepository')
    private portfolioItemRepository: IPortfolioItemRepository,

    // Provider para armazenamento de arquivos
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    description,
    image_name,
  }: IRequest): Promise<PortfolioItem> {
    // Realizando o upload da imagem no drive
    const image_reference = await this.storageProvider.saveFile(image_name);

    // Salvando os dados do item no banco de dados
    const createdPortfolioItem = await this.portfolioItemRepository.create({
      title,
      description,
      image_reference,
    });

    return createdPortfolioItem;
  }
}

export default CreatePortfolioItemService;
