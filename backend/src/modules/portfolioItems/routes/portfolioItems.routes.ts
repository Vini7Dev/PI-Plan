import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../configs/uploadConfig';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';

import PortfolioItemsController from '../controllers/PortfolioItemsController';

// Instanciando as rotas dos itens do portfólio
const portfolioItemsRoutes = Router();

// Instanciando o controller do portfólio
const portfolioItemsController = new PortfolioItemsController();

// Instanciando o upload de imagens
const upload = multer({
  storage: uploadConfig.storage,
});

// Criando as rotas dos itens do portfólio
//      Essas rotas são de acesso livre
portfolioItemsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  portfolioItemsController.show,
);

portfolioItemsRoutes.get(
  '/',
  portfolioItemsController.get,
);

// Aplicando os middlewares nas rotas abaixo
portfolioItemsRoutes.use(ensureAuthenticated);
portfolioItemsRoutes.use(ensureAdmin);

portfolioItemsRoutes.post(
  '/',
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().max(45).required(),
      description: Joi.string().required(),
    },
  }),
  portfolioItemsController.create,
);

portfolioItemsRoutes.put(
  '/:id',
  upload.single('image'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().max(45).required(),
      description: Joi.string().required(),
    },
  }),
  portfolioItemsController.update,
);

portfolioItemsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  portfolioItemsController.delete,
);

export default portfolioItemsRoutes;
