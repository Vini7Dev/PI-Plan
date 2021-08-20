import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersController from '../controllers/OrdersController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo pedido
const orderRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
orderRoutes.use(ensureAuthenticated);
orderRoutes.use(ensureAdmin);

// Instanciando o controller de pedido
const ordersController = new OrdersController();

// Criando as rotas dos pedidos
orderRoutes.get(
  '/',
  ordersController.get,
);

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      //
    },
  }),
  ordersController.create,
);

orderRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      //
    },
  }),
  ordersController.update,
);

orderRoutes.delete(
  '/:id',
  ordersController.delete,
);

export default orderRoutes;
