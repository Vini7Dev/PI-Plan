import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AssemblersController from '../controllers/AssemblersController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo montador
const assemblerRoutes = Router();

// Instanciando o controller de montador
const assemblersController = new AssemblersController();

// Aplicando os middlewares nas rotas abaixo
assemblerRoutes.use(ensureAuthenticated);
assemblerRoutes.use(ensureAdmin);

// Criando as rotas dos montadores
assemblerRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assemblersController.show,
);

assemblerRoutes.get(
  '/',
  assemblersController.get,
);

assemblerRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(45).required(),
      cellphone: Joi.string().max(15).required(),
      username: Joi.string().max(30).required(),
      password: Joi.string().min(6).required(),
    },
  }),
  assemblersController.create,
);

assemblerRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      cellphone: Joi.string().required(),
      username: Joi.string().required(),
      current_password: Joi.string().min(6).alphanum().required(),
      new_password: Joi.string().min(6).alphanum(),
    },
  }),
  assemblersController.update,
);

assemblerRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assemblersController.delete,
);

export default assemblerRoutes;
