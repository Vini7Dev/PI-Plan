import ICreatePortfolioItemDTO from '../dtos/ICreatePortfolioItemDTO';
import PortfolioItem from '../typeorm/entities/PortfolioItem';

interface PortfolioItemRepository {
  findById(id: string): Promise<PortfolioItem | undefined>;
  list(): Promise<PortfolioItem[]>;
  create(data: ICreatePortfolioItemDTO): Promise<PortfolioItem>;
  update(data: ICreatePortfolioItemDTO): Promise<PortfolioItem>;
  delete(id: string): Promise<string>;
}

export default PortfolioItemRepository;
