import { Router } from 'express';
import adminRoutes from '../../../../modules/users/infra/http/routes/admin.routes';

// Instanciando o objeto de rotas principal
const routes = Router();

// Aplicando todas as rotas da aplicação
routes.use('/admin', adminRoutes);

export default routes;
