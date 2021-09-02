import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import InstallationsController from '../controllers/InstallationsController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo instalação
const installationRoutes = Router();

// Aplicando o middleware nas rotas abaixo
installationRoutes.use(ensureAuthenticated);

// Instanciando o controller da instalação
const installationsController = new InstallationsController();

// Criando as rotas das instalações
installationRoutes.get(
  '/',
  installationsController.get,
);

// Aplicando o middleware nas rotas que exigem a autenticação de um admin
installationRoutes.use(ensureAdmin);

installationRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.string().uuid().required(),
      start_date: Joi.string().length(10).required(),
      end_date: Joi.string().length(10),
      completion_forecast: Joi.string().length(10).required(),
      price: Joi.number().required(),
      assemblers_installation: Joi.array().min(1).items(Joi.object({
        assembler_id: Joi.string().uuid().required(),
        commission_percentage: Joi.number().required().min(0),
      }).required()).required(),
    },
  }),
  installationsController.create,
);

installationRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      start_date: Joi.string().length(10).required(),
      end_date: Joi.string().length(10),
      completion_forecast: Joi.string().length(10).required(),
      price: Joi.number().required(),
      assemblers_installation: Joi.array().min(1).items(Joi.object({
        assembler_id: Joi.string().uuid().required(),
        commission_percentage: Joi.number().required().min(0),
      }).required()).required(),
    },
  }),
  installationsController.update,
);

installationRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  installationsController.delete,
);

export default installationRoutes;
