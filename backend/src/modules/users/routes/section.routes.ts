import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SectionsController from '../controllers/SectionsController';

// Instanciando as rotas do modelo administrador
const sectionRoutes = Router();

// Instanciando o controller de sessões
const sectionsController = new SectionsController();

// Criando as rotas dos administradores
sectionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().max(30).required(),
      password: Joi.string().min(6).required(),
    },
  }),
  sectionsController.create,
);

export default sectionRoutes;
