import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePortfolioItemService from '../services/CreatePortfolioItemService';
import DeletePortfolioItemService from '../services/DeletePortfolioItemService';
import ListPortfolioItemsService from '../services/ListPortfolioItemsService';

class PortfolioItemsController {
  public async get(request: Request, response: Response): Promise<Response> {
    // Executando o serviço para listagem dos itens do portfólio
    const listPortfolioItemsService = container.resolve(ListPortfolioItemsService);

    const portfolioItemsList = await listPortfolioItemsService.execute();

    return response.json(portfolioItemsList);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados para o cadastro de um item no portfólio
    const {
      title,
      description,
    } = request.body;
    const image = request.file;

    // Executando o serviço para o cadastro do item no portfólio
    const createPortfolioItemService = container.resolve(CreatePortfolioItemService);

    const createdPortfolioItem = await createPortfolioItemService.execute({
      title,
      description,
      image_name: image.filename,
    });

    return response.status(201).json(createdPortfolioItem);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Method not implemented.' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    // Recuperando o id do item para apagar nos parâmetros da requisição
    const { id } = request.params;

    // Executando o serviço para apagar o item
    const deletePortfolioItemService = container.resolve(DeletePortfolioItemService);

    const responseMessage = await deletePortfolioItemService.execute(id);

    return response.json(responseMessage);
  }
}

export default PortfolioItemsController;
