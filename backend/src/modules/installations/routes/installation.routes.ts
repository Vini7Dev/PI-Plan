import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import InstallationsController from '../controllers/InstallationsController';
import ensureAuthenticated from '../../../shared/http/middlewares/ensureAuthenticated';
import ensureAdmin from '../../../shared/http/middlewares/ensureAdmin';

// Instanciando as rotas do modelo instalação
const installationRoutes = Router();

// Aplicando os middlewares nas rotas abaixo
installationRoutes.use(ensureAuthenticated);
installationRoutes.use(ensureAdmin);

// Instanciando o controller da instalação
const installationsController = new InstallationsController();

// Criando as rotas das instalações
installationRoutes.get(
  '/',
  installationsController.get,
);

installationRoutes.post(
  '/',
  installationsController.create,
);

installationRoutes.put(
  '/:id',
  installationsController.update,
);

installationRoutes.delete(
  '/:id',
  installationsController.delete,
);

export default installationRoutes;
