// Rotas deste Usuario
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';
import AssessmentsController from '../controllers/AssessmentsController';

// Instanciando as rotas das avaliações
const assessmentRoutes = Router();

// Aplicando o middleware de autenticação nas rotas abaixo
assessmentRoutes.use(ensureAuthenticated);

// Instanciando o controller das avaliações
const assessmentsController = new AssessmentsController();

// Criando as rotas das avaliações
assessmentRoutes.get(
  '/',
  assessmentsController.get,
);

assessmentRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assessmentsController.show,
);

// Aplicando o middleware para verificar se o usuário é administrador nas rotas abaixo
assessmentRoutes.use(ensureAdmin);

assessmentRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      installation_id: Joi.string().uuid().required(),
      cleaning_note: Joi.number().required(),
      finish_note: Joi.number().required(),
      customer_note: Joi.number().required(),
      manager_note: Joi.number().required(),
      loss_amount: Joi.number().required(),
      comment: Joi.string().max(100),
    },
  }),
  assessmentsController.create,
);

assessmentRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      cleaning_note: Joi.number().required(),
      finish_note: Joi.number().required(),
      customer_note: Joi.number().required(),
      manager_note: Joi.number().required(),
      loss_amount: Joi.number().required(),
      comment: Joi.string().max(100),
    },
  }),
  assessmentsController.update,
);

assessmentRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assessmentsController.delete,
);

export default assessmentRoutes;
