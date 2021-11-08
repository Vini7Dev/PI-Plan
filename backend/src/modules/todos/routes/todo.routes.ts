// Rotas deste Usuario
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';
import ToDosController from '../controllers/ToDosController';

// Instanciando as rotas para as tarefas
const toDoRoutes = Router();

// Aplicando o middleware nas rotas abaixo
toDoRoutes.use(ensureAuthenticated);
toDoRoutes.use(ensureAdmin);

// Instanciando o controller das tarefas
const todosController = new ToDosController();

// Criando as rotas das tarefas
toDoRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  todosController.show,
);

toDoRoutes.get(
  '/',
  todosController.get,
);

toDoRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      admin_id: Joi.string().uuid().required(),
      done: Joi.bool().required(),
      title: Joi.string().max(45).required(),
      description: Joi.string().max(100).required(),
    },
  }),
  todosController.create,
);

toDoRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      done: Joi.bool().required(),
      title: Joi.string().max(45).required(),
      description: Joi.string().max(100).required(),
    },
  }),
  todosController.update,
);

toDoRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  todosController.delete,
);

export default toDoRoutes;
