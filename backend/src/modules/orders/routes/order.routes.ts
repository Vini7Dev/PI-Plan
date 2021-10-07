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
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

orderRoutes.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      search_string: Joi.string(),
    },
  }),
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
      start_date: Joi.string().length(10).required(),
      end_date: Joi.string().length(10),
      furniture_delivery_forecast: Joi.string().length(10),
      payment_method: Joi.string().required(),
      gross_value: Joi.number().required(),
      expenses_value: Joi.number().required(),
    },
  }),
  ordersController.create,
);

orderRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      address: Joi.object().required().keys({
        cep: Joi.string().length(9).required(),
        street: Joi.string().required(),
        number: Joi.number(),
        complement: Joi.string(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required(),
        country: Joi.string().required(),
      }),
      current_status: Joi.number().required(),
      current_proccess: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string(),
      installation_environments: Joi.string().required(),
      start_date: Joi.string().length(10).required(),
      end_date: Joi.string().length(10),
      furniture_delivery_forecast: Joi.string().length(10),
      payment_method: Joi.string().required(),
      gross_value: Joi.number().required(),
      expenses_value: Joi.number().required(),
    },
  }),
  ordersController.update,
);

orderRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.delete,
);

export default orderRoutes;
