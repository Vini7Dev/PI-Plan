import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import InstallationsController from '../controllers/InstallationsController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo instalação
const installationRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
installationRoutes.use(ensureAuthenticated);
installationRoutes.use(ensureAdmin);

// Instanciando o controller da instalação
const installationsController = new InstallationsController();

// Criando as rotas das instalações
installationRoutes.get(
  '/',
  installationsController.get,
);

installationRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.string().uuid().required(),
      done: Joi.boolean().required(),
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
    [Segments.BODY]: {
      done: Joi.boolean().required(),
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
  installationsController.delete,
);

export default installationRoutes;
