import { Router } from 'express';

import AdminsController from '../controllers/AdminsController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';

// Instanciando as rotas do modelo administrador
const adminRoutes = Router();

// Instanciando o controller de administrador
const adminsController = new AdminsController();

// Criando as rotas dos administradores
adminRoutes.get(
  '/',
  ensureAuthenticated,
  adminsController.get,
);

adminRoutes.post(
  '/',
  ensureAuthenticated,
  adminsController.create,
);

adminRoutes.put(
  '/:id',
  ensureAuthenticated,
  adminsController.update,
);

adminRoutes.delete(
  '/:id',
  ensureAuthenticated,
  adminsController.delete,
);

export default adminRoutes;
