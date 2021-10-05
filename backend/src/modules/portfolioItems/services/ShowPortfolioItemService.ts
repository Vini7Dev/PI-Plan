import { inject, injectable } from 'tsyringe';
import IPortfolioItemRepository from '../repositories/IPortfolioItemRepository';
import PortfolioItem from '../typeorm/entities/PortfolioItem';

@injectable()
class ShowPortfolioItemService {
  constructor(
    // Repositório dos itens do portfólio
    @inject('PortfolioItemRepository')
    private portfolioItemRepository: IPortfolioItemRepository,
  ) {}

  // Serviço para busca do item do portfólio pelo id
  public async execute(id: string): Promise<PortfolioItem | undefined> {
    const findedPortfolioItem = await this.portfolioItemRepository.findById(id);

    return findedPortfolioItem;
  }
}

export default ShowPortfolioItemService;
