import { Router } from 'express';

import AssemblersController from '../controllers/AssemblersController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo montador
const assemblerRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
assemblerRoutes.use(ensureAuthenticated);
assemblerRoutes.use(ensureAdmin);

// Instanciando o controller de montador
const assemblersController = new AssemblersController();

// Criando as rotas dos montadores
assemblerRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  assemblersController.get,
);

assemblerRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  assemblersController.create,
);

assemblerRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  assemblersController.update,
);

assemblerRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  assemblersController.delete,
);

export default assemblerRoutes;
