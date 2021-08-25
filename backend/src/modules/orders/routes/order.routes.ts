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
      customer_id: Joi.string().uuid().required(),
      address: {
        cep: Joi.string().length(9).required(),
        street: Joi.string().required(),
        number: Joi.number(),
        complement: Joi.string(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required(),
        country: Joi.string().required(),
      },
      current_status: Joi.number().required(),
      current_proccess: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string(),
      installation_environments: Joi.string().required(),
      start_date: Joi.string().required(),
      end_date: Joi.string(),
      furniture_delivery_forecast: Joi.string(),
      payment_method: Joi.string().required(),
      net_value: Joi.string().required(),
      expenses_value: Joi.string().required(),
    },
  }),
  ordersController.create,
);

orderRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      address: {
        cep: Joi.string().length(9).required(),
        street: Joi.string().required(),
        number: Joi.number(),
        complement: Joi.string(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required(),
        country: Joi.string().required(),
      },
      current_status: Joi.number().required(),
      current_proccess: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string(),
      installation_environments: Joi.string().required(),
      start_date: Joi.string().required(),
      end_date: Joi.string(),
      furniture_delivery_forecast: Joi.string(),
      payment_method: Joi.string().required(),
      net_value: Joi.string().required(),
      expenses_value: Joi.string().required(),
    },
  }),
  ordersController.update,
);

orderRoutes.delete(
  '/:id',
  ordersController.delete,
);

export default orderRoutes;
