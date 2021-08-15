import { Router } from 'express';

import AdminsController from '../controllers/AdminsController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo administrador
const adminRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
adminRoutes.use(ensureAuthenticated);
adminRoutes.use(ensureAdmin);

// Instanciando o controller de administrador
const adminsController = new AdminsController();

// Criando as rotas dos administradores
adminRoutes.get(
  '/',
  adminsController.get,
);

adminRoutes.post(
  '/',
  adminsController.create,
);

adminRoutes.put(
  '/:id',
  adminsController.update,
);

adminRoutes.delete(
  '/:id',
  adminsController.delete,
);

export default adminRoutes;
