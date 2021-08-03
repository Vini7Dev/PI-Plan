import { Router } from 'express';
import AdminsController from '../controllers/AdminsController';

// Instanciando as rotas do modelo administrador
const adminRoutes = Router();

// Instanciando o controller de administrador
const adminsController = new AdminsController();

// Criando as rotas dos administradores
adminRoutes.get('/', adminsController.get);
adminRoutes.post('/', adminsController.create);
adminRoutes.put('/:id', adminsController.update);
adminRoutes.delete('/:id', adminsController.delete);

export default adminRoutes;
