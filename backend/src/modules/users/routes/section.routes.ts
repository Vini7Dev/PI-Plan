import { Router } from 'express';
import SectionsController from '../controllers/SectionsController';

// Instanciando as rotas do modelo administrador
const sectionRoutes = Router();

// Instanciando o controller de sessões
const sectionsController = new SectionsController();

// Criando as rotas dos administradores
sectionRoutes.post('/', sectionsController.create);

export default sectionRoutes;
