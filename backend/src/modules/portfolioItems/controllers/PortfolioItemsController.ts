import { Request, Response } from 'express';

class PortfolioItemsController {
  public async get(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Method not implemented.' });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Method not implemented.' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Method not implemented.' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Method not implemented.' });
  }
}

export default PortfolioItemsController;
