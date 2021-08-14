import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAssemblerService from '../services/assembler/CreateAssemblerService';
import DeleteAssemblerService from '../services/assembler/DeleteAssemblerService';
import ListAssemblersService from '../services/assembler/ListAssemblersService';
import UpdateAssemblerService from '../services/assembler/UpdateAssemblerService';

class AssemblersController {
  // Listando todos os montadores
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const listAssemblersService = container.resolve(ListAssemblersService);

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
      const createAssemblerService = container.resolve(CreateAssemblerService);

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
    try {
      // Recebendo os dados para a atualizar os dados do montador
      const { id } = request.params;
      const {
        name,
        cellphone,
        username,
        current_password,
        new_password,
      } = request.body;

      // Serviço para o cadastro do montador
      const updateAssemblerService = container.resolve(UpdateAssemblerService);

      const updatedsAssembler = await updateAssemblerService.execute({
        id,
        name,
        cellphone,
        username,
        current_password,
        new_password,
      });

      return response.status(201).json(updatedsAssembler);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Apagando um montador
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      // Recebendo a referência do montador que vai ser removido
      const { id } = request.params;

      // Serviço para a remoção do montador
      const deleteAssemblerService = container.resolve(DeleteAssemblerService);

      await deleteAssemblerService.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default AssemblersController;
