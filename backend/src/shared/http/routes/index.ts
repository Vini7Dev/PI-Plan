import { Router } from 'express';

import adminRoutes from '../../../modules/users/routes/admin.routes';
import assemblerRoutes from '../../../modules/users/routes/assembler.routes';
import sectionRoutes from '../../../modules/users/routes/section.routes';
import customerRoutes from '../../../modules/customers/routes/customer.routes';
import orderRoutes from '../../../modules/orders/routes/order.routes';
import installationRoutes from '../../../modules/installations/routes/installation.routes';
import reminderRoutes from '../../../modules/users/routes/reminder.routes';

// Instanciando o objeto de rotas principal
const routes = Router();

// Unindo todas as rotas da aplicação na principal
routes.use('/admins', adminRoutes);
routes.use('/assemblers', assemblerRoutes);
routes.use('/sections', sectionRoutes);
routes.use('/customers', customerRoutes);
routes.use('/orders', orderRoutes);
routes.use('/installations', installationRoutes);
routes.use('/reminders', reminderRoutes);

export default routes;
