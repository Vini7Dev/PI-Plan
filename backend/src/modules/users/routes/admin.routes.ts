import { Router } from 'express';

import AdminsController from '../controllers/AdminsController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo administrador
const adminRoutes = Router();

// Instanciando o controller de administrador
const adminsController = new AdminsController();

// Criando as rotas dos administradores
adminRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  adminsController.get,
);

adminRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  adminsController.create,
);

adminRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  adminsController.update,
);

adminRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  adminsController.delete,
);

export default adminRoutes;
