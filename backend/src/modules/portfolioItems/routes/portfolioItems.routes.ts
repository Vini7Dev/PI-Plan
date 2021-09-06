import { Router } from 'express';
import PortfolioItemsController from '../controllers/PortfolioItemsController';

// Instanciando as rotas dos itens do portfólio
const portfolioItemsRoutes = Router();

// Instanciando o controller do portfólio
const portfolioItemsController = new PortfolioItemsController();

// Criando as rotas dos itens do portfólio
portfolioItemsRoutes.get(
  '/',
  portfolioItemsController.get,
);

portfolioItemsRoutes.post(
  '/',
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
