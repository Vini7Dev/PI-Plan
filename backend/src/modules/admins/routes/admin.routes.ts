import { Router } from 'express';
import AdminController from '../controllers/AdminController';

// Instanciando as rotas do modelo administrador
const adminRoutes = Router();

// Instanciando o controller de administrador
const adminController = new AdminController();

// Criando as rotas dos administradores
adminRoutes.get('/', adminController.get);
adminRoutes.post('/', adminController.create);
adminRoutes.put('/:id', adminController.update);
adminRoutes.delete('/:id', adminController.delete);

export default adminRoutes;
