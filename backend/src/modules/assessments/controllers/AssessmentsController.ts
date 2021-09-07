import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAssessmentsServices from '../services/CreateAssessmentsService';
import DeleteAssessmentsServices from '../services/DeleteAssessmentsService';
import ListAssessmentsService from '../services/ListAssessmentsService';
import ShowAssessmentService from '../services/ShowAssessmentService';
import UpdateAssessmentsService from '../services/UpdateAssessmentsService';

class AssessmentsController {
  // Buscando uma avaliação pelo id
  public async show(request: Request, response: Response): Promise<Response> {
    // Recuperando o id da valiação na requisição
    const { id } = request.params;

    // Executando o serviço para buscar a avaliação
    const showAssessmentService = container.resolve(ShowAssessmentService);

    const showAssessment = await showAssessmentService.execute(id);

    return response.json(showAssessment);
  }

  // Listando todas as avaliações salvas
  public async get(request: Request, response: Response): Promise<Response> {
    // Executando o serviço para a listagem das avaliações
    const listAssessmentsService = container.resolve(ListAssessmentsService);

    const assessmentList = await listAssessmentsService.execute();

    return response.json(assessmentList);
  }

  // Cadastrando uma nova avaliação
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados para a criação no corpo da requisição
    const {
      installation_id,
      cleaning_note,
      finish_note,
      customer_note,
      manager_note,
      loss_amount,
      comment,
    } = request.body;

    // Executando o serviço para criação da avaliação
    const createAssessmentService = container.resolve(CreateAssessmentsServices);

    const createdAssessment = await createAssessmentService.execute({
      installation_id,
      cleaning_note,
      finish_note,
      customer_note,
      manager_note,
      loss_amount,
      comment,
    });

    return response.status(201).json(createdAssessment);
  }

  // Atualizando os dados de uma avaliação
  public async update(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados na requisição
    const { id } = request.params;
    const {
      cleaning_note,
      finish_note,
      customer_note,
      manager_note,
      loss_amount,
      comment,
    } = request.body;

    // Serviço para a atualização dos dados da avaliação
    const updateAssessmentsService = container.resolve(UpdateAssessmentsService);

    const updatedAssessment = await updateAssessmentsService.execute({
      id,
      cleaning_note,
      finish_note,
      customer_note,
      manager_note,
      loss_amount,
      comment,
    });

    return response.status(201).json(updatedAssessment);
  }

  // Apagando uma avaliação
  public async delete(request: Request, response: Response): Promise<Response> {
    // Recuperando o id da avaliação nos parâmetros da requisição
    const { id } = request.params;

    // Executando o serviço para apagar a avaliação
    const deleteAssessmentService = container.resolve(DeleteAssessmentsServices);

    const responseMessage = await deleteAssessmentService.execute(id);

    return response.json({ message: responseMessage });
  }
}

export default AssessmentsController;
