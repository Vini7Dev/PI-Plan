import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../configs/uploadConfig';

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
portfolioItemsRoutes.get(
  '/',
  portfolioItemsController.get,
);

portfolioItemsRoutes.post(
  '/',
  upload.single('image'),
  portfolioItemsController.create,
);

portfolioItemsRoutes.put(
  '/',
  portfolioItemsController.update,
);

portfolioItemsRoutes.delete(
  '/',
  portfolioItemsController.delete,
);

export default portfolioItemsRoutes;
