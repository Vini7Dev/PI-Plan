import { Router } from 'express';

import AdminToDosController from '../controllers/AdminToDosController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas para as tarefas de um administrador
const adminToDoRoutes = Router();

// Aplicando os middlewres nas rotas abaixo
adminToDoRoutes.use(ensureAuthenticated);
adminToDoRoutes.use(ensureAdmin);

// Instanciando o controlador
const adminToDosController = new AdminToDosController();

// Definindo as rotas
adminToDoRoutes.get(
  '/',
  adminToDosController.get,
);

export default adminToDoRoutes;
