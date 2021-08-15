import { Router } from 'express';

import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import CustomersController from '../controllers/CustomersController';

// Instanciando as rotas do modelo cliente
const customerRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
customerRoutes.use(ensureAuthenticated);
customerRoutes.use(ensureAdmin);

// Instanciando o controller de cliente
const customerController = new CustomersController();

// Criando as rotas dos clientes
customerRoutes.get(
  '/',
  customerController.get,
);

customerRoutes.post(
  '/',
  customerController.create,
);

customerRoutes.put(
  '/:id',
  customerController.update,
);

customerRoutes.delete(
  '/:id',
  customerController.delete,
);

export default customerRoutes;
