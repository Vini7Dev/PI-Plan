import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';
import UsersController from '../controllers/UsersController';

// Instanciando as rotas dos usuários
const userRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
userRoutes.use(ensureAuthenticated);
userRoutes.use(ensureAdmin);

// Instanciando o controller dos usuários
const usersController = new UsersController();

// Criando as rotas dos usuários
userRoutes.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      search_string: Joi.string().required(),
    },
  }),
  usersController.get,
);

export default userRoutes;
