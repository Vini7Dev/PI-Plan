import { Request, Response } from 'express';
import CreateAssemblerService from '../services/assembler/CreateAssemblerService';
import ListAssemblersService from '../services/assembler/ListAssemblersService';

class AssemblersController {
  // Listando todos os montadores
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const listAssemblersService = new ListAssemblersService();

      const assemblersList = await listAssemblersService.execute();

      return response.json(assemblersList);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Cadastrando um novo montador
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      // Recebendo os dados para a criação do montador
      const {
        name,
        cellphone,
        username,
        password,
      } = request.body;

      // Serviço para o cadastro do montador
      const createAssemblerService = new CreateAssemblerService();

      const createdAssembler = await createAssemblerService.execute({
        name,
        cellphone,
        username,
        password,
      });

      return response.status(201).json(createdAssembler);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Atualizando os dados do montador
  public async update(request: Request, response: Response): Promise<Response> {
    return response.send();
  }

  // Apagando um montador
  public async delete(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}

export default AssemblersController;
