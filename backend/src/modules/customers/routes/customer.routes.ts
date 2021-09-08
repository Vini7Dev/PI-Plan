import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.show,
);

customerRoutes.get(
  '/',
  customerController.get,
);

customerRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      send_contact_alert: Joi.bool().required(),
      name: Joi.string().max(30).required(),
      phone: Joi.string().max(15).required(),
      document: Joi.string().max(18).required(),
      next_contact_date: Joi.string().length(10).required(),
    },
  }),
  customerController.create,
);

customerRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      send_contact_alert: Joi.bool().required(),
      name: Joi.string().max(30).required(),
      phone: Joi.string().max(15).required(),
      document: Joi.string().max(18).required(),
      next_contact_date: Joi.string().length(10).required(),
    },
  }),
  customerController.update,
);

customerRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

export default customerRoutes;
