import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).alphanum().required(),
      permission_create_admin: Joi.bool().required(),
    },
  }),
  adminsController.create,
);

adminRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      current_password: Joi.string().min(6).alphanum().required(),
      new_password: Joi.string().min(6).alphanum(),
    },
  }),
  adminsController.update,
);

adminRoutes.delete(
  '/:id',
  adminsController.delete,
);

export default adminRoutes;
