import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import RemindersController from '../controllers/RemindersController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas dos lembretes
const remindersRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
remindersRoutes.use(ensureAuthenticated);
remindersRoutes.use(ensureAdmin);

// Instanciando o controller dos lembretes
const remindersController = new RemindersController();

// Criando as rotas dos lembretes
remindersRoutes.get(
  '/:date',
  celebrate({
    [Segments.PARAMS]: {
      date: Joi.string().length(10).required(),
    },
  }),
  remindersController.get,
);

export default remindersRoutes;
