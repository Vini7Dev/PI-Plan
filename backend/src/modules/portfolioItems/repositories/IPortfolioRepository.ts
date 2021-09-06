import ICreatePortfolioItemDTO from '../dtos/ICreatePortfolioItemDTO';
import PortfolioItem from '../typeorm/entities/PortfolioItem';

interface IPortfolioRepository {
  list(): Promise<PortfolioItem>;
  create(data: ICreatePortfolioItemDTO): Promise<PortfolioItem>;
  update(data: ICreatePortfolioItemDTO): Promise<PortfolioItem>;
  delete(id: string): Promise<string>;
}

export default IPortfolioRepository;
