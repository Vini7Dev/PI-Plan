import { Router } from 'express';
import adminRoutes from '../../../modules/admins/routes/admin.routes';

// Instanciando o objeto de rotas principal
const routes = Router();

// Unindo todas as rotas da aplicação na principal
routes.use('/admins', adminRoutes);

export default routes;
