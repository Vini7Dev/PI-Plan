import { injectable } from 'tsyringe';

import IPortfolioItemRepository from '../repositories/IPortfolioItemRepository';
import PortfolioItem from '../typeorm/entities/PortfolioItem';

@injectable()
class ListPortfolioItemsService {
  constructor(
    // Repositório dos itens do protfólio
    private portfolioItemsRepository: IPortfolioItemRepository,
  ) {}

  // Serviço de listagem dos itens do portfólio
  public async execute(): Promise<PortfolioItem[]> {
    const portfolioItemsList = await this.portfolioItemsRepository.list();

    return portfolioItemsList;
  }
}

export default ListPortfolioItemsService;
