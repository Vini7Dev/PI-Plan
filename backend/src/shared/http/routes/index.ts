import { Router } from 'express';

import usersRoutes from '../../../modules/users/routes/users.routes';
import adminRoutes from '../../../modules/users/routes/admin.routes';
import assemblerRoutes from '../../../modules/users/routes/assembler.routes';
import sectionRoutes from '../../../modules/users/routes/section.routes';
import customerRoutes from '../../../modules/customers/routes/customer.routes';
import orderRoutes from '../../../modules/orders/routes/order.routes';
import installationRoutes from '../../../modules/installations/routes/installation.routes';
import assessmentRoutes from '../../../modules/assessments/routes/assessments.routes';
import reminderRoutes from '../../../modules/users/routes/reminder.routes';
import todoRoutes from '../../../modules/todos/routes/todo.routes';
import adminToDoRoutes from '../../../modules/todos/routes/adminToDo.routes';
import portfolioItemsRoutes from '../../../modules/portfolioItems/routes/portfolioItems.routes';

// Instanciando o objeto de rotas principal
const routes = Router();

// Unindo todas as rotas da aplicação na principal
routes.use('/users', usersRoutes);
routes.use('/admins', adminRoutes);
routes.use('/assemblers', assemblerRoutes);
routes.use('/sections', sectionRoutes);
routes.use('/customers', customerRoutes);
routes.use('/orders', orderRoutes);
routes.use('/installations', installationRoutes);
routes.use('/assessments', assessmentRoutes);
routes.use('/reminders', reminderRoutes);
routes.use('/todos', todoRoutes);
routes.use('/admin-todos', adminToDoRoutes);
routes.use('/portfolio-items', portfolioItemsRoutes);

export default routes;
