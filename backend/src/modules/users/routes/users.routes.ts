import { Router } from 'express';

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

// Criando as rotas dos administradores
userRoutes.get(
  '/',
  usersController.get,
);

export default userRoutes;
