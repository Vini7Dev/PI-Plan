import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateInstallationsService from '../services/CreateInstallationsService';

class InstallationsController {
  public async get(request: Request, response: Response): Promise<Response> {
    throw new Error('method not implemented.');
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados da instalação na requisição
    const {
      order_id,
      done,
      start_date,
      end_date,
      completion_forecast,
      price,
      assemblers_installation,
    } = request.body;

    // Executando o serviço para o cadastro de instalação
    const createInstallationsService = container.resolve(CreateInstallationsService);

    const createdInstallation = await createInstallationsService.execute({
      order_id,
      done,
      start_date,
      end_date,
      completion_forecast,
      price,
      assemblers_installation,
    });

    return response.status(201).json(createdInstallation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    throw new Error('method not implemented.');
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    throw new Error('method not implemented.');
  }
}

export default InstallationsController;
