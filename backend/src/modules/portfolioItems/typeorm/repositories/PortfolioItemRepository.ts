import { getRepository, Repository } from 'typeorm';

import ICreatePortfolioItemDTO from '../../dtos/ICreatePortfolioItemDTO';
import IPortfolioItemRepository from '../../repositories/IPortfolioItemRepository';
import PortfolioItem from '../entities/PortfolioItem';

class PortfolioItemRepository implements IPortfolioItemRepository {
  private repository: Repository<PortfolioItem>;

  constructor() {
    this.repository = getRepository(PortfolioItem);
  }

  // Buscando um item do portfólio pelo id
  public async findById(id: string): Promise<PortfolioItem | undefined> {
    const findedPortfolioItem = await this.repository.findOne(id);

    return findedPortfolioItem;
  }

  // Listando os itens do portfólio
  public async list(): Promise<PortfolioItem[]> {
    const portfolioItemsList = await this.repository.find();

    return portfolioItemsList;
  }

  // Cadastrando um novo item no portfólio
  public async create({
    image_reference,
    title,
    description,
  }: ICreatePortfolioItemDTO): Promise<PortfolioItem> {
    const createdPortfolioItem = this.repository.create({
      image_reference,
      title,
      description,
    });

    await this.repository.save(createdPortfolioItem);

    return createdPortfolioItem;
  }

  // Atualizando um item no portfólio
  public async update({
    id,
    image_reference,
    title,
    description,
  }: ICreatePortfolioItemDTO): Promise<PortfolioItem> {
    const updatedPortfolioItem = await this.repository.save({
      id,
      image_reference,
      title,
      description,
    });

    return updatedPortfolioItem;
  }

  // Apagando um item do portfólio
  public async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);

    return 'Item removido do portfólio.';
  }
}

export default PortfolioItemRepository;
